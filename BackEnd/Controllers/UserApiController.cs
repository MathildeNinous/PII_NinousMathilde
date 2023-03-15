using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd.Data;
using BackEnd.Models;

namespace BackEnd.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserApiController : ControllerBase
{
    private readonly BackEndContext _context;

    public UserApiController(BackEndContext context)
    {
        _context = context;
    }

    // GET: api/UserApi => renvoie la liste des users
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        var users = _context.Users
            .OrderBy(u => u.LastName)
            .ThenBy(u => u.FirstName);

        return await users.ToListAsync();
    }

    // GET: api/UserApi/5 => accèder à un élément = renvoie le user identifié par l'id
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound();
        return user;
    }

    // POST: api/UserApi => permet de créer un nouveau user
    [HttpPost]
    public async Task<ActionResult<User>> PostUser(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(PostUser), new { id = user.Id }, user);
    }

    // PUT: api/UserApi/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUser(int id, User user)
    {
        if (id != user.Id)
            return BadRequest();

        _context.Entry(user).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(id))
                return NotFound();
            else
                throw;
        }
        return NoContent();
    }

    // Renvoie vrai si le user spécifié existe déja
    private bool UserExists(int id)
    {
        return _context.Users.Any(m => m.Id == id);
    }

    // DELETE: api/UserApi/5 => supprime l'élément choisi en renseignant l'id
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound();

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}