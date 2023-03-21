using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd.Data;
using BackEnd.Models;

namespace BackEnd.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PropositionApiController : ControllerBase
{
    private readonly BackEndContext _context;

    public PropositionApiController(BackEndContext context)
    {
        _context = context;
    }

    // GET: api/PropositionApi => renvoie la liste des propositions
    public async Task<ActionResult<IEnumerable<Proposition>>> GetPropositions()
    {
        var propositions = _context.Propositions
            .Include(p => p.Question)
            .OrderBy(p => p.Id);

        return await propositions.ToListAsync();
    }

    // GET: api/PropositionApi/5 => accèder à un élément = renvoie le proposition identifié par l'id
    [HttpGet("{id}")]
    public async Task<ActionResult<Proposition>> GetProposition(int id)
    {
        var proposition = await _context.Propositions.FindAsync(id);
        if (proposition == null)
            return NotFound();
        return proposition;
    }

    // GET: api/PropositionApi/{QuestionId} => renvoie la liste de tous les propositions de la question dont l'id est renseigné
    [HttpGet("GetPropositionsQuestionById/{idQuestion}")]
    public async Task<ActionResult<IEnumerable<Proposition>>> GetPropositionsQuestionById(int idQuestion)
    {
        // Vérifier si la question avec l'ID spécifié existe
        var question = await _context.Questions.FindAsync(idQuestion);
        if (question == null)
        {
            return NotFound();
        }

        var propositions = _context.Propositions
            .Where(p => p.QuestionId == idQuestion);

        if (propositions == null)
            return NotFound();

        return await propositions.ToListAsync();
    }

    // POST: api/PropositionApi => permet de créer une nouvelle proposition
    [HttpPost]
    public async Task<ActionResult<PropositionDTO>> PostProposition(PropositionDTO propositionDTO)
    {
        // Rechercher la question correspondant à l'ID fourni
        var question = await _context.Questions.FindAsync(propositionDTO.QuestionId);
        if (question == null)
        {
            return BadRequest("La question spécifiée n'existe pas.");
        }

        var proposition = new Proposition(propositionDTO);
        proposition.Question = question;

        _context.Propositions.Add(proposition);
        await _context.SaveChangesAsync();

        // Convertir la nouvelle proposition en DTO et la renvoyer dans la réponse
        var newPropositionDTO = new PropositionDTO
        {
            Id = proposition.Id,
            Text = proposition.Text,
            QuestionId = proposition.QuestionId,
            IsCorrect = proposition.IsCorrect
        };

        return CreatedAtAction(nameof(PostProposition), new { id = proposition.Id }, newPropositionDTO);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutProposition(int id, PropositionDTO propositionDTO)
    {
        if (id != propositionDTO.Id)
            return BadRequest();

        var proposition = await _context.Propositions
            .Include(p => p.Question) // inclure la question associée à la proposition
            .FirstOrDefaultAsync(p => p.Id == id);

        if (proposition == null)
            return NotFound();

        proposition.Text = propositionDTO.Text;
        proposition.IsCorrect = propositionDTO.IsCorrect;

        // Si la question associée à la proposition a été modifiée, on la met à jour
        if (proposition.QuestionId != propositionDTO.QuestionId)
        {
            var newQuestion = await _context.Questions.FindAsync(propositionDTO.QuestionId);
            if (newQuestion == null)
                return BadRequest("La question spécifiée n'existe pas.");

            proposition.Question = newQuestion;
        }

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PropositionExists(id))
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }

    // Renvoie vrai si le proposition spécifié existe déja
    private bool PropositionExists(int id)
    {
        return _context.Propositions.Any(m => m.Id == id);
    }

    // DELETE: api/PropositionApi/5 => supprime l'élément choisi en renseignant l'id
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProposition(int id)
    {
        var proposition = await _context.Propositions.FindAsync(id);
        if (proposition == null)
            return NotFound();

        _context.Propositions.Remove(proposition);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}