using BackEnd.Models;

namespace BackEnd.Models;


public class QuizDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public List<Question> Questions { get; set; }

}

