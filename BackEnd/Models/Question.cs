namespace BackEnd.Models;

/* La classe Question représente une question posée dans un quiz.
Elle contient un identifiant unique, une question textuelle,
ainsi qu'une liste de propositions de réponses possibles. */

public class Question
{
    public int Id { get; set; }
    public string Text { get; set; } = null!;
    public int QuizId { get; set; }
    public Quiz Quiz { get; set; } = null!;
    public List<Proposition> Propositions { get; set; } = new List<Proposition>();

    public Question()
    {

    }

    public Question(QuestionDTO DTO)
    {
        Id = DTO.Id;
        Text = DTO.Text;
        QuizId = DTO.QuizId;
        Propositions = DTO.Propositions.Select(p => new Proposition(p)).ToList();
    }
}


