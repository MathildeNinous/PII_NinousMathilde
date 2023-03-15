namespace BackEnd.Models;


/* AnswerUser stocke la réponse donnée par l'utilisateur à une question donnée dans le cadre d'un quiz
Elle contient un identifiant unique, l'identifiant de la question à laquelle elle correspond, l'identifiant
de la proposition choisie par l'utilisateur, et un booléen indiquant si la réponse est correcte ou non. */

public class AnswerUser
{
    public int Id { get; set; }
    public int QuestionId { get; set; }
    public int PropositionId { get; set; }
    public Question Question { get; set; } = null!;
    public Proposition Proposition { get; set; } = null!;
    public User User { get; set; } = null!;
}
