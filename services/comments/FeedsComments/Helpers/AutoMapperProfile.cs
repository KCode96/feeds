using AutoMapper;
using FeedComments.DTOs;
using FeedComments.Models;
using FeedsComments.Models;

namespace FeedComments.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Comment, CommentDto>().ReverseMap();
        CreateMap<Article, GetArticleDto>().ReverseMap();
        CreateMap<Comment, GetCommentDto>().ReverseMap();
        CreateMap<CreateCommentDto, Comment>().ReverseMap();
    }
}
