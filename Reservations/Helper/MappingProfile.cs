using AutoMapper;
using Reservations.Dto;
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
            CreateMap<FootballField, FootballFieldDto>();
            CreateMap<FootballFieldDto, FootballField>();
            CreateMap<ReservationStatus, ReservationStatusDto>();
            CreateMap<ReservationStatusDto, ReservationStatus>();
            CreateMap<ReservationBlock, ReservationBlockDto>();
            CreateMap<ReservationBlockDto, ReservationBlock>();
            CreateMap<Post, PostDto>();
            CreateMap<PostDto, Post>();
            CreateMap<Comment, CommentDto>();
            CreateMap<CommentDto, Comment>();
            CreateMap<Reservation, ReservationDto>();
            CreateMap<ReservationDto, Reservation>();
            CreateMap<User, UserDto>();
            CreateMap<View, ViewDto>();
            CreateMap<ViewDto, View>();
            CreateMap<Like, LikeDto>();
            CreateMap<LikeDto, Like>();
        }

    }
}
