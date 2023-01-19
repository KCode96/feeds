using FeedsComments.Models;

namespace FeedComments.DTOs;

public class GetCommentDto
{
    public int Id { get; set; }
    public string Body { get; set; } = string.Empty;
    public Commentor? Commentor { get; set; }
    public string CommentorId { get; set; } = String.Empty;
    public int ArticleId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
