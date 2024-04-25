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
    public class ReservationBlockController : ControllerBase
    {
        private readonly IReservationBlockRepository _reservationBlockRepository;
        private readonly IMapper _mapper;
        public ReservationBlockController(IReservationBlockRepository reservationBlockRepository,
            IMapper mapper)
        {
            _reservationBlockRepository = reservationBlockRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var rblock = _mapper.Map<List<ReservationBlockDto>>
                (await _reservationBlockRepository.GetReservationBlocksAsync());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(rblock);
        }

        [HttpGet("{reservationBlokeId}")]
        public async Task<IActionResult> GetById(int reservationBlokeId)
        {
            if (!_reservationBlockRepository.ReservationBlockExists(reservationBlokeId))
                return NotFound(ModelState);

            var rblock = _mapper.Map<ReservationBlockDto>
                (await _reservationBlockRepository.GetReservationBlockAsync(reservationBlokeId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(rblock);
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservationBlock([FromBody] ReservationBlockDto ReservationBlockCreate)
        {
            if (ReservationBlockCreate == null)
                return BadRequest(ModelState);

            var resMap = _mapper.Map<ReservationBlock>(ReservationBlockCreate);
            if (!_reservationBlockRepository.CreateReservationBlock(resMap))
            {
                ModelState.AddModelError("", "Something woring while savin");
                return BadRequest(ModelState);
            }
            return Ok("Successfully Created");
        }

        [HttpPut("{resBlockId}")]
        public IActionResult UpdateReservationBlock(int resBlockId, [FromBody] ReservationBlockDto updateResBlock)
        {
            if (updateResBlock == null)
                return BadRequest();

            if (resBlockId != updateResBlock.Id)
                return BadRequest(ModelState);

            if (!_reservationBlockRepository.ReservationBlockExists(resBlockId))
                return NotFound(ModelState);

            if (!ModelState.IsValid)
                return BadRequest();

            var resBlockMap = _mapper.Map<ReservationBlock>(updateResBlock);

            if (!_reservationBlockRepository.UpdateReservationBlock(resBlockMap))
            {
                ModelState.AddModelError("", "Somthing went woring while updating");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{ResBlockId}")]
        public async Task<IActionResult> DeleteReservationBlock(int ResBlockId)
        {
            if (!_reservationBlockRepository.ReservationBlockExists(ResBlockId))
                return NotFound();

            var resToDelete = await _reservationBlockRepository.GetReservationBlockAsync(ResBlockId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_reservationBlockRepository.DeleteReservationBlock(resToDelete))
                ModelState.AddModelError("", "Something went wring deleting");

            return NoContent();

        }
    }
}
