using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd.Data;
using BackEnd.Models;

namespace BackEnd.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ScoreApiController : ControllerBase
{
    private readonly BackEndContext _context;

    public ScoreApiController(BackEndContext context)
    {
        _context = context;
    }

    // GET: api/ScoreApi => renvoie la liste des scores
    public async Task<ActionResult<IEnumerable<Score>>> GetScores()
    {
        var scores = _context.Scores
            .OrderBy(s => s.Date);

        return await scores.ToListAsync();
    }

    // GET: api/ScoreApi/5 => accèder à un élément = renvoie le score identifié par l'id du quiz
    [HttpGet("{idQuiz}")]
    public async Task<ActionResult<IEnumerable<Score>>> GetScoresByQuizId(int idQuiz)
    {
        var scores = _context.Scores
            .Where(s => s.QuizId == idQuiz);

        if (scores == null)
            return NotFound();

        return await scores.ToListAsync();
    }

    // POST: api/ScoreApi => permet de créer un nouveau score
    [HttpPost]
    public async Task<ActionResult<Score>> PostScore(ScoreDTO score)
    {
        Score _score = new Score(score);
        var quiz = _context.Quizzes.Find(_score.QuizId);
        _score.Quiz = quiz!;

        _context.Scores.Add(_score);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(PostScore), new { id = _score.Id }, _score);
    }

    // DELETE: api/ScoreApi/5 => supprime l'élément choisi en renseignant l'id
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteScore(int id)
    {
        var score = await _context.Scores.FindAsync(id);
        if (score == null)
            return NotFound();

        _context.Scores.Remove(score);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}