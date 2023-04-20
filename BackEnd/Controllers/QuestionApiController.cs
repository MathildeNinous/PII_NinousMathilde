using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd.Data;
using BackEnd.Models;

namespace BackEnd.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuestionApiController : ControllerBase
{
    private readonly BackEndContext _context;

    public QuestionApiController(BackEndContext context)
    {
        _context = context;
    }

    // GET: api/QuestionApi => renvoie la liste des questions
    public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
    {
        var questions = await _context.Questions
            .Include(q => q.Quiz)
            .Include(q => q.Propositions)
            .ToListAsync();

        return questions;
    }

    // GET: api/QuestionApi/{Id} => renvoie la question identifiée par l'id
    [HttpGet("{id}")]
    public async Task<ActionResult<Question>> GetQuestion(int id)
    {
        var question = await _context.Questions
        .Include(q => q.Quiz)
        .Include(q => q.Propositions)
        .FirstOrDefaultAsync(q => q.Id == id);

        if (question == null)
            return NotFound();
        return question;
    }

    // GET: api/QuestionApi/{EcoleId} => renvoie la liste de tous les questionx de l'école dont l'id est renseigné
    [HttpGet("GetQuestionsQuizById/{idQuiz}")]
    public async Task<ActionResult<IEnumerable<Question>>> GetQuestionsQuizById(int idQuiz)
    {
        // Vérifier si le quiz avec l'ID spécifié existe
        var quiz = await _context.Quizzes.FindAsync(idQuiz);
        if (quiz == null)
        {
            return NotFound();
        }

        var questions = _context.Questions
            .Where(q => q.QuizId == idQuiz);

        if (questions == null)
            return NotFound();

        return await questions.ToListAsync();
    }

    // POST: api/QuestionApi => permet de créer une nouvelle question 
    [HttpPost]
    public async Task<ActionResult<Question>> PostQuestion(QuestionDTO questionDTO)
    {
        var quiz = await _context.Quizzes.FindAsync(questionDTO.QuizId);
        if (quiz == null)
        {
            return BadRequest("Le quiz spécifié n'existe pas.");
        }

        var question = new Question
        {
            Text = questionDTO.Text,
            Quiz = quiz,
            Propositions = new List<Proposition>()
        };

        _context.Questions.Add(question);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(PostQuestion), new { id = question.Id }, question);
    }

    // POST: api/QuestionApi/{id}/AddPropositions
    [HttpPost("{id}/AddPropositions")]
    public async Task<IActionResult> AddPropositionsToQuestion(int id, List<PropositionDTO> propositionDTOs)
    {
        var question = await _context.Questions.Include(q => q.Propositions).FirstOrDefaultAsync(q => q.Id == id);

        if (question == null)
        {
            return NotFound();
        }

        foreach (var propositionDTO in propositionDTOs)
        {
            var proposition = new Proposition
            {
                Text = propositionDTO.Text,
                IsCorrect = propositionDTO.IsCorrect,
                QuestionId = propositionDTO.QuestionId,
            };

            _context.Propositions.Add(proposition);

            question.Propositions.Add(proposition);
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }


    // PUT: api/QuestionApi/5 => mettre à jour une question
    [HttpPut("{id}")]
    public async Task<IActionResult> PutQuestion(int id, QuestionDTO questionDTO)
    {
        if (id != questionDTO.Id)
            return BadRequest();

        var question = await _context.Questions.Include(q => q.Propositions).FirstOrDefaultAsync(q => q.Id == id);
        if (question == null)
            return NotFound();

        // Mettre à jour les propriétés de la question
        question.Text = questionDTO.Text;
        question.QuizId = questionDTO.QuizId;

        // Mettre à jour les propositions de réponse existantes
        foreach (var propositionDTO in questionDTO.Propositions)
        {
            var proposition = question.Propositions.FirstOrDefault(p => p.Id == propositionDTO.Id);
            if (proposition == null)
                return BadRequest();

            proposition.Text = propositionDTO.Text;
            proposition.IsCorrect = propositionDTO.IsCorrect;
        }

        // Ajouter de nouvelles propositions de réponse
        foreach (var propositionDTO in questionDTO.Propositions.Where(p => p.Id == 0))
        {
            var proposition = new Proposition
            {
                Id = id,
                Text = propositionDTO.Text,
                IsCorrect = propositionDTO.IsCorrect
            };
            question.Propositions.Add(proposition);
        }

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!QuestionExists(id))
                return NotFound();
            else
                throw;
        }
        return NoContent();
    }

    // Renvoie vrai si la question spécifiée existe déja
    private bool QuestionExists(int id)
    {
        return _context.Questions.Any(q => q.Id == id);
    }

    // DELETE: api/QuestionApi/5 => supprime la question choisie en renseignant l'id
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuestion(int id)
    {
        var question = await _context.Questions.FindAsync(id);
        if (question == null)
            return NotFound();

        _context.Questions.Remove(question);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}