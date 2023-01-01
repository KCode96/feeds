using FeedComments.DTOs;
using FeedsComments.Models;

namespace FeedsComments.Interfaces;

public interface ICommentRepository
{
    Task<List<Comment>> GetComments(int aid);
    Task<bool> CreateComment(Comment commentBody);
    Task<bool> UpdateComment(Comment comment);
    Task<Comment> DeleteComment(int aid, int cid, string commentorId);
    Task<bool> CommentExists(int aid, int cid, string commentorId);
    Task<Comment> FindComment(int aid, int cid, string commentorId);
    Task<bool> Save();
}
