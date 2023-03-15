using BackEnd.Models;

namespace BackEnd.Models;

public class PropositionDTO
{
    public int Id { get; set; }
    public string Text { get; set; } = null!;
    public int QuestionId { get; set; }
    public bool IsCorrect { get; set; }

    public PropositionDTO()
    {
    }

    public PropositionDTO(Proposition proposition)
    {
        Id = proposition.Id;
        Text = proposition.Text;
        IsCorrect = proposition.IsCorrect;
    }

}