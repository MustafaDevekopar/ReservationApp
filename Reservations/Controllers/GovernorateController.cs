using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto;
using Reservations.Interfaces;

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
    }
}
