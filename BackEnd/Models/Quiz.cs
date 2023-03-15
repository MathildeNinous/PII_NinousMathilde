namespace BackEnd.Models;

/*
Classe Quiz: pour stocker les informations sur chaque quiz, telles que le titre, la description,
les questions et les réponses possibles. Cette classe sera utilisée pour afficher les quiz à
l'utilisateur et stocker les résultats des quiz.*/

public class Quiz
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public List<Question> Questions { get; set; }

    public Quiz()
    {

    }
    public Quiz(QuizDTO DTO)
    {
        Id = DTO.Id;
        Title = DTO.Title;
        Questions = DTO.Questions;
    }
}