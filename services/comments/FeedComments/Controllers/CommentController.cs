using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using FeedsComments.Models;
using FeedsComments.Interfaces;
using FeedComments.DTOs;
using FeedComments.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace FeedsComments.Controllers;

[Authorize]
[ApiController]
[Route("/api/articles/:aid/comments")]
public class CommentController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly ICommentRepository _commentRepository;

    public CommentController(IMapper mapper, ICommentRepository commentRepository)
    {
        _mapper = mapper;
        _commentRepository = commentRepository;
    }

    [HttpGet]
    [ProducesResponseType(200, Type = typeof(Response<IEnumerable<CommentDto>>))]
    public IActionResult GetAllComments()
    {
        var response = new Response<List<CommentDto>>();
        var comments = _mapper.Map<List<CommentDto>>(_commentRepository.GetComments());

        response.Data = comments;

        return Ok(response);
    }

    [HttpPost]
    [ProducesResponseType(201, Type = typeof(Response<CommentDto>))]
    public IActionResult CreateCommentInArticle(
        [FromBody] CommentDto commentBody,
        [FromRoute] int aid
    )
    {
        var response = new Response<CommentDto>();
        var comment = _commentRepository.CreateComment(aid, commentBody);

        response.Data = _mapper.Map<CommentDto>(comment);

        return Ok(response);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(200, Type = typeof(Response<CommentDto>))]
    [ProducesResponseType(400, Type = typeof(Response<>))]
    [ProducesResponseType(404, Type = typeof(Response<>))]
    public IActionResult UpdateComment(
        [FromRoute] int aid,
        [FromRoute] int cid,
        [FromBody] CommentDto commentBody
    )
    {
        var response = new Response<CommentDto>();
        var comment = _commentRepository.UpdateComment(aid, cid, commentBody);

        if (comment == null)
        {
            response.Success = false;
            return BadRequest(response);
        }

        if (!_commentRepository.CommentExists(aid, cid))
        {
            response.Success = false;
            response.Message = "Comment not found";
            return NotFound(response);
        }

        return Ok(response);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(200, Type = typeof(Response<CommentDto>))]
    [ProducesResponseType(404, Type = typeof(Response<>))]
    public IActionResult DeleteComment([FromRoute] int aid, [FromRoute] int cid)
    {
        var response = new Response<CommentDto>();

        if (!_commentRepository.CommentExists(aid, cid))
        {
            response.Success = false;
            response.Message = "Comment not found";
            return NotFound(response);
        }

        return Ok(response);
    }
}
