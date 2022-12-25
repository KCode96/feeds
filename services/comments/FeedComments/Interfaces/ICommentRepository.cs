using FeedComments.DTOs;
using FeedsComments.Models;

namespace FeedsComments.Interfaces;

public interface ICommentRepository
{
    ICollection<Comment> GetComments();
    Comment CreateComment(int aid, CommentDto commentBody);
    Comment UpdateComment(int aid, int cid, CommentDto commentBody);
    Comment DeleteComment(int aid, int cid);
    bool CommentExists(int aid, int cid);

}
