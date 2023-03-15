namespace BackEnd.Models;

/*
La classe Proposition représente une proposition de réponse possible pour une question donnée.
Elle contient un identifiant unique, le texte de la proposition et un booléen indiquant si elle
est la bonne réponse à la question ou non.*/

public class Proposition
{
    public int Id { get; set; }
    public int QuestionId { get; set; }
    public string Text { get; set; } = null!;
    public bool IsCorrect { get; set; }

    public Question Question { get; set; } = null!;

    public Proposition()
    {

    }

    public Proposition(PropositionDTO DTO)
    {
        Id = DTO.Id;
        Text = DTO.Text;
        QuestionId = DTO.QuestionId;
        IsCorrect = DTO.IsCorrect;
    }
}