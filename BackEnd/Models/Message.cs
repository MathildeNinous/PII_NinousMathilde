namespace BackEnd.Models;

public class Message
{
    public int Id { get; set; }
    public string Text { get; set; } = null!;
    public DateTime Date { get; set; }
    public User Sender { get; set; } = null!;
}