namespace BackEnd.Models;

/*Classe Score: pour stocker les scores et les résultats de chaque jeu de mémoire.
Cette classe sera utilisée pour stocker les résultats des jeux de mémoire de l'utilisateur.*/

public class Score
{
    public int Id { get; set; }
    public Quiz Quiz { get; set; } = null!;
    public int QuizId { get; set; }
    public int ValeurScore { get; set; }
    public DateTime Date { get; set; }

    public Score()
    {

    }

    public Score(ScoreDTO DTO)
    {
        Id = DTO.Id;
        QuizId = DTO.QuizId;
        ValeurScore = DTO.ValeurScore;
        Date = DTO.Date;
    }
}

