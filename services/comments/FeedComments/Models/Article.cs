using FeedsComments.Models;

namespace FeedComments.Models;

public class Article
{
    public int Id { get; set; }
    public string Title { get; set; } = String.Empty;
    public List<Comment>? Comments { get; set; }
    public int LikesCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
