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
    }
}
