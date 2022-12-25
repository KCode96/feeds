namespace FeedsComments.Models;

public class User
{
    public string Id { get; set; } = String.Empty;
    public string Username { get; set; } = String.Empty;
    public string Email { get; set; } = String.Empty;
    public string Image { get; set; } = String.Empty;
    public string Bio { get; set; } = String.Empty;
    public string Role { get; set; } = String.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}
