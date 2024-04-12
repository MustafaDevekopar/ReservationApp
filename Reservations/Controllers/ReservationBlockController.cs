using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto;
using Reservations.Interfaces;

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
    }
}
