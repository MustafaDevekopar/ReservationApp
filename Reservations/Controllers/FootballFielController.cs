﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Data;
using Reservations.Dto;
using Reservations.Interfaces;
using Reservations.Models;
using Reservations.Repository;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FootballFielController : ControllerBase
    {
        private readonly IFootballFieldRepository _footballFieldRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IGovernorateRepository _governorateRepository;
        private readonly IReservationBlockRepository _reservationBlockRepository;
        private readonly IReservationStatusRepository _reservationStatusRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public FootballFielController(IFootballFieldRepository footballFieldRepository,
            ICategoryRepository categoryRepository,
            IGovernorateRepository governorateRepository,
            IReservationBlockRepository reservationBlockRepository,
            IReservationStatusRepository reservationStatusRepository,
            IMapper mapper, DataContext context)
        {
            _footballFieldRepository = footballFieldRepository;
            _categoryRepository = categoryRepository;
            _governorateRepository = governorateRepository;
            _reservationBlockRepository = reservationBlockRepository;
            _reservationStatusRepository = reservationStatusRepository;
            _mapper = mapper;
            _context = context;
        }


        [HttpGet]
        public async Task<IActionResult> GerFields()
        {
            var footballFields = _mapper.Map<List<FootballFieldDto>>
                (await _footballFieldRepository.GetFootballFieldsAsync());

            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            return Ok(footballFields);
        }


        [HttpGet("{FieldId}")]
        public async Task<IActionResult> GetField(int FieldId)
        {
            if (!_footballFieldRepository.FootballFieldExists(FieldId))
                return NotFound(ModelState);

            var field = _mapper.Map<FootballFieldDto>
                (await _footballFieldRepository.GetFootballFieldAsync(FieldId));

            return Ok(field);
        }


        [HttpGet("{fieldId}/Category")]
        public async Task<IActionResult> GetCategoryOfField(int fieldId)
        {
            var CategoryOfField =_mapper.Map<CategoryDto>
                ( await _footballFieldRepository.GetCategoryOfFieldAsync(fieldId));

            return Ok(CategoryOfField);
        }


        [HttpGet("{fieldId}/Governorate")]
        public async Task<IActionResult> GetCovrfField(int fieldId)
        {
            var GovernorateFoField = _mapper.Map<GovernorateDto>
                (await _footballFieldRepository.GetGovernorateOfFieldAsync(fieldId));

            return Ok(GovernorateFoField);
        }

        [HttpPost]
        public async Task<IActionResult> CreateFootballFaild([FromQuery]int categoryId,
            [FromQuery]int governorateId,
            [FromBody] FootballFieldDto footballFieldCreate)
        {
            if(footballFieldCreate == null)
            {
                ModelState.AddModelError("", "FootballField connot by empty");
                return BadRequest(ModelState);
            }

            var fieldMapp = _mapper.Map<FootballField>(footballFieldCreate);

            fieldMapp.Category = await _categoryRepository.GetCategoryAsync(categoryId);
            fieldMapp.Governorate = await _governorateRepository.GetGovernorateAsync(governorateId);
            fieldMapp.ReservationBlock = await _reservationBlockRepository.GetReservationBlockAsync(1);
            fieldMapp.ReservationStatus = await _reservationStatusRepository.GetReservationStatusByIdAsync(1);

            if (!_footballFieldRepository.CreateFootballField(fieldMapp))
            {
                ModelState.AddModelError("", "Somthenk hapen whene saven");
                return BadRequest(ModelState);
            }

            return Ok("Successfully Created");
        }
    }
}
