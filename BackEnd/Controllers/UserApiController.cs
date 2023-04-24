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

    public class AuthenticationRequest
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }

    [HttpPost("authentification")]
    public async Task<ActionResult<User>> VerifUser([FromBody] AuthenticationRequest request)
    {
        Console.WriteLine("Email: " + request.Email);
        Console.WriteLine("Mot de passe : " + request.Password);

        // Vérifier si l'email et le mot de passe sont fournis
        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
        {
            return BadRequest("Email ou mot de passe manquant");
        }

        // Vérifier si l'utilisateur existe dans la base de données
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

        if (existingUser == null)
        {
            return BadRequest("Email ou mot de passe incorrect");
        }

        // Vérifier si le mot de passe est correct
        if (existingUser.Password != request.Password)
        {
            return BadRequest("Mot de passe incorrect");
        }

        // Authentification réussie
        return existingUser;
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