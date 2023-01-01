using FeedsComments.Models;
using Newtonsoft.Json;

namespace FeedComments.Helpers;

public class Claim
{
    private IHttpContextAccessor _httpContextAccessor;

    public Claim(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Commentor getCommentorClaim()
    {
        var userClaimString = _httpContextAccessor.HttpContext!.User.Claims
            .FirstOrDefault(c => c.Type == "user")!
            .Value;

        var commentor = JsonConvert.DeserializeObject<Commentor>(userClaimString);

        return commentor!;
    }
}
