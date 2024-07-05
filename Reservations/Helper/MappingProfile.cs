using AutoMapper;
using Reservations.Dto;
using Reservations.Dto.Admin;
using Reservations.Dto.Comment;
using Reservations.Dto.FieldDto;
using Reservations.Dto.Post;
using Reservations.Dto.Reservation;
using Reservations.Dto.User;
using Reservations.Models;

namespace Reservations.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryDto, Category>();
            CreateMap<Governorate, GovernorateDto>();
            CreateMap<GovernorateDto, Governorate>();
            CreateMap<FootballField, FootballFieldDto>();
            CreateMap<FootballFieldDto, FootballField>();
            CreateMap<Post, PostDto>();
            CreateMap<PostDto, Post>();
            CreateMap<Comment, CommentDto>();
            CreateMap<CommentDto, Comment>();
            CreateMap<Comment, CommentGreateDto>();
            CreateMap<CommentGreateDto, Comment>();
            CreateMap<Reservation, ReservationDto>();
            CreateMap<ReservationDto, Reservation>();
            CreateMap<User, UserDto>();
            CreateMap<User, UserPatchDto>().ReverseMap();
            CreateMap<View, ViewDto>();
            CreateMap<ViewDto, View>();
            CreateMap<Like, LikeDto>();
            CreateMap<LikeDto, Like>();
            CreateMap<UserField, UserFieldDto>();
            CreateMap<UserFieldDto, UserField>();
            CreateMap<AppUser, UserAdminDto>();
        }

    }
}
