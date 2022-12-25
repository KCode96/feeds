using FeedComments.DTOs;
using FeedsComments.Data;
using FeedsComments.Interfaces;
using FeedsComments.Models;

namespace FeedsComments.Repositories;

public class CommentRepository : ICommentRepository
{
    private DataContext _context;

    public CommentRepository(DataContext context)
    {
        _context = context;
    }

    public ICollection<Comment> GetComments()
    {
        return _context.Comments.ToList();
    }

    public Comment CreateComment(int aid, CommentDto commentBody)
    {
        throw new NotImplementedException();
    }

    public Comment UpdateComment(int aid, int cid, CommentDto commentBody)
    {
        throw new NotImplementedException();
    }

    public Comment DeleteComment(int aid, int cid)
    {
        throw new NotImplementedException();
    }

    public bool CommentExists(int aid, int cid)
    {
        throw new NotImplementedException();
    }
}
