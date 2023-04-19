using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd.Data;
using BackEnd.Models;

namespace BackEnd.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuizApiController : ControllerBase
{
    private readonly BackEndContext _context;

    public QuizApiController(BackEndContext context)
    {
        _context = context;
    }

    // GET: api/QuizApi => renvoie la liste des quizzes
    public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizzes()
    {
        var quizzes = _context.Quizzes
            .OrderBy(q => q.Title);

        return await quizzes.ToListAsync();
    }

    // GET: api/QuizApi/5 => accèder à un élément = renvoie le quiz identifié par l'id
    [HttpGet("{id}")]
    public async Task<ActionResult<Quiz>> GetQuiz(int id)
    {
        var quiz = await _context.Quizzes.FindAsync(id);
        if (quiz == null)
            return NotFound();
        return quiz;
    }

    // POST: api/QuizApi => permet de créer un nouveau quiz
    [HttpPost]
    public async Task<ActionResult<Quiz>> PostQuiz(QuizDTO quizDTO)
    {
        var quiz = new Quiz
        {
            Title = quizDTO.Title,
            Description = quizDTO.Description,
            Questions = new List<Question>()
        };

        _context.Quizzes.Add(quiz);

        await _context.SaveChangesAsync();

        return CreatedAtAction("GetQuiz", new { id = quiz.Id }, quiz);
    }

    // POST: api/QuizApi/5/AddQuestions
    [HttpPost("{id}/AddQuestions")]
    public async Task<IActionResult> AddQuestionsToQuiz(int id, List<QuestionDTO> questionDTOs)
    {
        var quiz = await _context.Quizzes.Include(q => q.Questions).ThenInclude(q => q.Propositions).FirstOrDefaultAsync(q => q.Id == id);

        if (quiz == null)
        {
            return NotFound();
        }

        foreach (var questionDTO in questionDTOs)
        {
            var question = new Question
            {
                Text = questionDTO.Text,
                Quiz = quiz,
                Propositions = new List<Proposition>()
            };

            _context.Questions.Add(question);

            quiz.Questions.Add(question);
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutQuiz(int id, QuizDTO quizDTO)
    {
        if (id != quizDTO.Id)
        {
            return BadRequest();
        }

        var quiz = await _context.Quizzes.Include(q => q.Questions).FirstOrDefaultAsync(q => q.Id == id);

        if (quiz == null)
        {
            return NotFound();
        }

        quiz.Title = quizDTO.Title;
        quiz.Description = quizDTO.Description;

        // Ajoute les nouvelles questions
        var newQuestions = quizDTO.Questions.Where(q => q.Id == 0).Select(q => new QuestionDTO
        {
            Text = q.Text,
            Id = q.Id,
            Propositions = q.Propositions.Select(p => new PropositionDTO
            {
                Text = p.Text,
                IsCorrect = p.IsCorrect
            }).ToList()
        }).ToList();

        quiz.Questions.AddRange(newQuestions.Select(q => new Question(q)));

        await _context.SaveChangesAsync();

        // Convertit le quiz mis à jour en DTO et le renvoie dans la réponse
        var updatedQuizDTO = new QuizDTO
        {
            Id = quiz.Id,
            Title = quiz.Title,
            Description = quiz.Description,
            Questions = quiz.Questions
        };

        return Ok(updatedQuizDTO);
    }


    // Renvoie vrai si le quiz spécifié existe déja
    private bool QuizExists(int id)
    {
        return _context.Quizzes.Any(q => q.Id == id);
    }

    // DELETE: api/QuizApi/5 => supprime l'élément choisi en renseignant l'id
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuiz(int id)
    {
        var quiz = await _context.Quizzes.FindAsync(id);
        if (quiz == null)
            return NotFound();

        _context.Quizzes.Remove(quiz);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}