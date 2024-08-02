using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto.GovernorateDtos;
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
                ModelState.AddModelError("", "اسم المحافظه موجود بالفعل");
                return BadRequest(ModelState);
            }

            var governorateMap = _mapper.Map<Governorate>(governorateCreate);
            if (!_governorateRepository.CreateGovernorate(governorateMap))
            {
                ModelState.AddModelError("", "Something woring while savin");
                return BadRequest(ModelState);
            }
            return Ok("Successfully Created");
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "MainAdmin")]
        [HttpPut("{governorateId}")]
        public IActionResult UpdateCategory(int governorateId, [FromBody] GovernorateDto governorateDto)
        {
            if (governorateDto == null)
                return BadRequest();

            if (governorateId != governorateDto.Id)
                return BadRequest(ModelState);

            if (!_governorateRepository.GovernorateExists(governorateId))
                return NotFound(ModelState);

            if (!ModelState.IsValid)
                return BadRequest();

            var categoryMap = _mapper.Map<Governorate>(governorateDto);

            if (!_governorateRepository.UpdateGovernorate(categoryMap))
            {
                ModelState.AddModelError("", "Somthing went woring while updating");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "MainAdmin")]
        [HttpDelete("{categoryId}")]
        public async Task<IActionResult> DeleteCategory(int categoryId)
        {
            if (!_governorateRepository.GovernorateExists(categoryId))
                return NotFound();

            var categoryToDelete = await _governorateRepository.GetGovernorateAsync(categoryId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_governorateRepository.DeleteGovernorate(categoryToDelete))
                ModelState.AddModelError("", "Something went wring deleting");

            return NoContent();

        }
    }
}
