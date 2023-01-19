using FeedsComments.Models;

namespace FeedComments.DTOs;

public class GetArticleDto
{
    public int Id { get; set; }
    public string Title { get; set; } = String.Empty;
    public int LikesCount { get; set; }
    public List<GetCommentDto>? Comments { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
