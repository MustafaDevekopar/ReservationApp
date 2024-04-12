using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Data;
using Reservations.Dto;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FootballFielController : ControllerBase
    {
        private readonly IFootballFieldRepository _footballFieldRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public FootballFielController(IFootballFieldRepository footballFieldRepository,
            IMapper mapper, DataContext context)
        {
            _footballFieldRepository = footballFieldRepository;
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

    }
}
