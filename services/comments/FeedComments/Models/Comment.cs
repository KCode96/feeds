namespace FeedsComments.Models;

public class Comment
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UserId { get; set; } = String.Empty;
    public int articleId { get; set; }
}
