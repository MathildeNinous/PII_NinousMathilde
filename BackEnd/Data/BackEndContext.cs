using Microsoft.EntityFrameworkCore;
using BackEnd.Models;

namespace BackEnd.Data;

public class BackEndContext : DbContext
{
    public DbSet<AnswerUser> AnswersUser { get; set; } = null!;
    public DbSet<Message> Messages { get; set; } = null!;
    public DbSet<Proposition> Propositions { get; set; } = null!;
    public DbSet<Question> Questions { get; set; } = null!;
    public DbSet<Quiz> Quizzes { get; set; } = null!;
    public DbSet<Score> Scores { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
    public string DbPath { get; private set; }

    public BackEndContext()
    {
        // Path to SQLite database file
        DbPath = "BackEnd.db";
    }

    // The following configures EF to create a SQLite database file locally
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // Use SQLite as database
        options.UseSqlite($"Data Source={DbPath}");
        // Optional: log SQL queries to console
        options.LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, LogLevel.Information);
    }
}