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
            var footballFields = await _footballFieldRepository.GetFootballFieldsAsync();

            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            var usersMap = footballFields.Select(field =>
            {
                string avatarBase64 = field.Avatar != null ? Convert.ToBase64String(field.Avatar) : null;
                return new FootballGetDto
                {
                    Id = field.Id,
                    Name = field.Name,
                    Username = field.Username,
                    //Password = field.Password,
                    //PhoneNumbr = field.PhoneNumbr,
                    Location = field.Location,
                    Latitude = field.Latitude,
                    Longitude = field.Longitude,
                    Avatar = avatarBase64
                };
            }).ToList();

            return Ok(usersMap);
        }

        //=================================================================================
        [HttpGet("{FieldId}")]
        public async Task<IActionResult> GetField(int FieldId)
        {
            if (!_footballFieldRepository.FootballFieldExists(FieldId))
                return NotFound(ModelState);

            var field = await _footballFieldRepository.GetFootballFieldAsync(FieldId);

            string avatarBase64 = field.Avatar != null ? Convert.ToBase64String(field.Avatar) : null;

            var fieldMap = new FootballGetDto
            {
                Id = field.Id,
                Name = field.Name,
                Username = field.Username,
                //Password = field.Password,
                //PhoneNumbr = field.PhoneNumbr,
                Location = field.Location,
                Latitude = field.Latitude,
                Longitude = field.Longitude,
                Avatar = avatarBase64
            };

            return Ok(fieldMap);
        }

        [HttpGet("fieldIdByUsername/{username}")]
        public async Task<IActionResult> GetUserIdByUsername(string username)
        {
            if (!_footballFieldRepository.FieldExixtsUsername(username))
                return NotFound(ModelState);

            var fieldId = await _footballFieldRepository.GetFieldIdByUsername(username);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(fieldId);
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
        public async Task<IActionResult> CreateFootballFaild([FromForm]FootballFieldCreateDto footballFieldCreate)
        {
            if (footballFieldCreate == null)
            {
                ModelState.AddModelError("", "FootballField connot by empty");
                return BadRequest(ModelState);
            }
            using var strem = new MemoryStream();
            await footballFieldCreate.Avatar.CopyToAsync(strem);

            var fieldMapp = new FootballField
            {
                Name = footballFieldCreate.Name,
                Username = footballFieldCreate.Username,
                //Password = footballFieldCreate.Password,
                //PhoneNumbr = footballFieldCreate.PhoneNumbr,
                Location = footballFieldCreate.Location,
                Avatar = strem.ToArray()
            };

            //var fieldMapp = _mapper.Map<FootballField>(footballFieldCreate);

            fieldMapp.Category = await _categoryRepository.GetCategoryAsync(footballFieldCreate.categoryId);
            fieldMapp.Governorate = await _governorateRepository.GetGovernorateAsync(footballFieldCreate.governorateId);
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
        public async Task<IActionResult>  UpdateFootballField(int fieldId,[FromForm]FootballfieldUpdateDto updateFootBallField)
        {
            if (updateFootBallField.Id  != fieldId)
            {
                ModelState.AddModelError("", "Field id in Url not equal faild id from form");
                return BadRequest(ModelState);
            }

            if (!_footballFieldRepository.FootballFieldExists(fieldId))
                return NotFound(ModelState);

            if (!ModelState.IsValid)
                return BadRequest();
            if (updateFootBallField == null)
            {
                ModelState.AddModelError("", "FootballField connot by empty");
                return BadRequest(ModelState);
            }
            using var strem = new MemoryStream();
            await updateFootBallField.Avatar.CopyToAsync(strem);

            var fieldMapp = new FootballField
            {
                Id =updateFootBallField.Id,
                Name = updateFootBallField.Name,
                Username = updateFootBallField.Username,
                //Password = updateFootBallField.Password,
                //PhoneNumbr = updateFootBallField.PhoneNumbr,
                Location = updateFootBallField.Location,
                Avatar = strem.ToArray()
            };

            fieldMapp.Category = await _categoryRepository.GetCategoryAsync(updateFootBallField.categoryId);
            fieldMapp.Governorate = await _governorateRepository.GetGovernorateAsync(updateFootBallField.governorateId);
            fieldMapp.ReservationBlock = await _reservationBlockRepository.GetReservationBlockAsync(fieldId);
            fieldMapp.ReservationStatus = await _reservationStatusRepository.GetReservationStatusByIdAsync(fieldId);



            if (!_footballFieldRepository.UpdateFootBallField(fieldMapp))
            {
                ModelState.AddModelError("", "Somthing went woring while updating");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

    }
}

