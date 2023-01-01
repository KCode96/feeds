using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using FeedsComments.Interfaces;
using FeedComments.DTOs;
using Microsoft.AspNetCore.Authorization;
using FeedsComments.Models;

namespace FeedsComments.Controllers;

[Authorize]
[ApiController]
[Route("/api/articles/{aid}/comments")]
public class CommentController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly ICommentRepository _commentRepository;
    private readonly Client _client;
    private readonly Claim _claim;

    public CommentController(
        IMapper mapper,
        ICommentRepository commentRepository,
        Client client,
        Claim claim
    )
    {
        _mapper = mapper;
        _commentRepository = commentRepository;
        _client = client;
        _claim = claim;
    }

    [AllowAnonymous]
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(Response<IEnumerable<CommentDto>>))]
    public async Task<IActionResult> GetAllComments([FromRoute] int aid)
    {
        var response = new Response<GetArticleDto>();
        var article = await _client.GetArticleById(aid);

        var comments = _mapper.Map<List<GetCommentDto>>(await _commentRepository.GetComments(aid));

        for (int i = 0; i < comments.Count; i++)
        {
            var commentor = await _client.GetCommentorById(comments[i].CommentorId);

            comments[i].Commentor = commentor;
        }

        article.Comments = comments;

        response.Data = _mapper.Map<GetArticleDto>(article);

        return Ok(response);
    }

    [HttpPost]
    [ProducesResponseType(201)]
    public async Task<IActionResult> CreateCommentInArticle(
        [FromBody] CreateCommentDto commentBody,
        [FromRoute] int aid
    )
    {
        var response = new Response<GetCommentDto>();

        var commentor = _claim.getCommentorClaim();

        var newComment = _mapper.Map<Comment>(commentBody);

        var article = await _client.GetArticleById(aid);

        newComment.ArticleId = aid;
        newComment.CommentorId = commentor!.Id;

        await _commentRepository.CreateComment(newComment);

        var comment = _mapper.Map<GetCommentDto>(newComment);

        comment.Commentor = commentor;

        response.Data = comment;

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(response);
    }

    [AllowAnonymous]
    [HttpPut("{cid}")]
    [ProducesResponseType(200, Type = typeof(Response<CommentDto>))]
    [ProducesResponseType(400, Type = typeof(Response<>))]
    public async Task<IActionResult> UpdateComment(
        [FromRoute] int aid,
        [FromRoute] int cid,
        [FromBody] UpdateCommentDto commentBody
    )
    {
        var response = new Response<GetCommentDto>();

        var commentor = _claim.getCommentorClaim();

        var comment = await _commentRepository.FindComment(aid, cid, commentor.Id);

        if (comment is null)
        {
            response.Success = false;
            response.Message = "Comment not found";
            return BadRequest(response);
        }

        comment.Body = commentBody.Body;

        await _commentRepository.UpdateComment(comment);

        response.Data = _mapper.Map<GetCommentDto>(comment);

        response.Data.Commentor = commentor;

        return Ok(response);
    }

    [HttpDelete("{cid}")]
    [ProducesResponseType(200, Type = typeof(Response<CommentDto>))]
    [ProducesResponseType(404, Type = typeof(Response<>))]
    public async Task<IActionResult> DeleteComment([FromRoute] int aid, [FromRoute] int cid)
    {
        var response = new Response<GetArticleDto>();

        var commentor = _claim.getCommentorClaim();

        if (!await _commentRepository.CommentExists(aid, cid, commentor.Id))
        {
            response.Success = false;
            response.Message = "Comment not found";
            return NotFound(response);
        }

        await _commentRepository.DeleteComment(aid, cid, commentor!.Id);

        var article = await _client.GetArticleById(aid);

        var comments = _mapper.Map<List<GetCommentDto>>(await _commentRepository.GetComments(aid));

        for (int i = 0; i < comments.Count; i++)
        {
            var ctr = await _client.GetCommentorById(comments[i].CommentorId);

            comments[i].Commentor = ctr;
        }

        article.Comments = comments;

        response.Data = _mapper.Map<GetArticleDto>(article);

        return Ok(response);
    }
}
