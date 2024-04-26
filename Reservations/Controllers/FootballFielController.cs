using AutoMapper;
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

            //var field = _mapper.Map<FootballFieldDto>
            //    (await _footballFieldRepository.GetFootballFieldAsync(FieldId));

            var field = await _footballFieldRepository.GetFootballFieldAsync(FieldId);

            string avatarBase64 = field.Avatar != null ? Convert.ToBase64String(field.Avatar) : null;

            var fieldMap = new FootballFieldGetDto
            {
                Id = (int)field.Id,
                Name = field.Name,
                Username = field.Username,
                Password = field.Password,
                PhoneNumbr = field.PhoneNumbr,
                Location = field.Location,
                Avatar = avatarBase64
            };

            return Ok(fieldMap);
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

        [HttpGet("{fieldId}/FollowedUsers")]
        public async Task<IActionResult> GetUserOfField(int fieldId)
        {
            var usersOfField = _mapper.Map<List<UserDto>>
                ( _footballFieldRepository.GetUsersOfField(fieldId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(usersOfField);
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

        [HttpPut("{fieldId}")]
        public IActionResult UpdateFootballField(int fieldId,[FromBody] FootballFieldDto updateFootBallField)
        {
            if (updateFootBallField == null)
                return BadRequest();

            if (fieldId != updateFootBallField.Id)
                return BadRequest(ModelState);

            if (!_footballFieldRepository.FootballFieldExists(fieldId))
                return NotFound(ModelState);

            if (!ModelState.IsValid)
                return BadRequest();

            var footballFieldMap = _mapper.Map<FootballField>(updateFootBallField);

            if (!_footballFieldRepository.UpdateFootBallField(footballFieldMap))
            {
                ModelState.AddModelError("", "Somthing went woring while updating");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

