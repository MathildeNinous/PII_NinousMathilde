namespace BackEnd.Models;

/*Classe Score: pour stocker les scores et les résultats de chaque jeu de mémoire.
Cette classe sera utilisée pour stocker les résultats des jeux de mémoire de l'utilisateur.*/

public class Score
{
    public int Id { get; set; }
    public int GameId { get; set; }
    public string PlayerName { get; set; } = null!;
    public int Points { get; set; }
    public DateTime Date { get; set; }
}