namespace BackEnd.Models;

public class ScoreDTO
{
    public int Id { get; set; }
    public int QuizId { get; set; }
    public int ValeurScore { get; set; }
    public DateTime Date { get; set; }
}