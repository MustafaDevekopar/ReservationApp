using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto;
using Reservations.Interfaces;
using Reservations.Models;
using Reservations.Repository;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GovernorateController : ControllerBase
    {
        private readonly IGovernorateRepository _governorateRepository;
        private readonly IMapper _mapper;
        public GovernorateController(IGovernorateRepository governorateRepository, IMapper mapper)
        {
            _governorateRepository = governorateRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetGovernorates() 
        {
            var governorate = _mapper.Map<List<GovernorateDto>>
                (await _governorateRepository.GetGovernoratesAsync());

            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            return Ok(governorate);
        }

        [HttpGet("{governorateId}")]
        public async Task<IActionResult> GetGovernorate(int governorateId)
        {
            if (!_governorateRepository.GovernorateExists(governorateId))
                return NotFound(ModelState);

            var governorate = _mapper.Map<GovernorateDto>
                (await _governorateRepository.GetGovernorateAsync(governorateId));

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(governorate);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGovernorate([FromBody]GovernorateDto governorateCreate)
        {
            if (governorateCreate == null)
                return BadRequest(ModelState);

            var governorate = await _governorateRepository.GetGovernorateByNameAsync(governorateCreate.Name);

            if (governorate != null)
            {
                ModelState.AddModelError("", "Governorate already exists");
                return StatusCode(422, ModelState);
            }

            var governorateMap = _mapper.Map<Governorate>(governorateCreate);
            if (!_governorateRepository.CreateGovernorate(governorateMap))
            {
                ModelState.AddModelError("", "Something woring while savin");
                return BadRequest(ModelState);
            }
            return Ok("Successfully Created");
        }
    }
}
