﻿using AutoMapper;
using Reservations.Dto;
using Reservations.Models;

namespace Reservations.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<Governorate, GovernorateDto>();
            CreateMap<FootballField, FootballFieldDto>();
        }

    }
}
