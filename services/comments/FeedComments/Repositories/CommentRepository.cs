using AutoMapper;
using FeedsComments.Data;
using FeedsComments.Interfaces;
using FeedsComments.Models;
using Microsoft.EntityFrameworkCore;

namespace FeedsComments.Repositories;

public class CommentRepository : ICommentRepository
{
    private DataContext _context;
    private IMapper _mapper;

    public CommentRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<Comment>> GetComments(int aid)
    {
        return await _context.Comments.Where(c => c.ArticleId == aid).ToListAsync();
    }

    public async Task<bool> CreateComment(Comment comment)
    {
        _context.Add(comment);
        return await Save();
    }

    public async Task<bool> UpdateComment(Comment comment)
    {
        _context.Update(comment);
        return await Save();
    }

    public async Task<Comment> DeleteComment(int aid, int cid, string commentorId)
    {
        var comment = await _context.Comments
            .Where(c => c.ArticleId == aid && c.Id == cid)
            .Where(c => c.CommentorId == commentorId)
            .FirstOrDefaultAsync();

        _context.Comments.Remove(comment!);
        await _context.SaveChangesAsync();

        return comment!;
    }

    public async Task<Comment> FindComment(int cid, int aid, string commentorId)
    {
        var comment = await _context.Comments
            .Where(c => c.Id == cid && c.ArticleId == aid)
            .Where(c => c.CommentorId == commentorId)
            .FirstOrDefaultAsync();
        return comment!;
    }

    public async Task<bool> CommentExists(int aid, int cid, string commentorId)
    {
        var comment = await _context.Comments
            .Where(c => c.Id == cid && c.ArticleId == aid)
            .Where(c => c.CommentorId == commentorId)
            .FirstOrDefaultAsync();

        if (comment is null)
            return false;

        return true;
    }

    public async Task<bool> Save()
    {
        var saved = await _context.SaveChangesAsync();
        return saved > 0 ? true : false;
    }
}
