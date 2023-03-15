using BackEnd.Models;

namespace BackEnd.Models;

public class QuestionDTO
{
    public int Id { get; set; }
    public string Text { get; set; }
    public int QuizId { get; set; }
    public List<PropositionDTO> Propositions { get; set; }

    public QuestionDTO()
    {
        Propositions = new List<PropositionDTO>();
    }

    public QuestionDTO(Question question)
    {
        Id = question.Id;
        Text = question.Text;
        QuizId = question.QuizId;
        Propositions = question.Propositions.Select(p => new PropositionDTO(p)).ToList();
    }
}
