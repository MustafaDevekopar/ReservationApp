using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto;
using Reservations.Interfaces;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IMapper _mapper;
        public ReservationController(IReservationRepository reservationRepository, IMapper mapper)
        {
            _reservationRepository = reservationRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetReservations()
        {
            var reservations = _mapper.Map<List<ReservationDto>>
                (await _reservationRepository.GetReservationsAsync());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(reservations);
        }
        [HttpGet("{resevationId}")]
        public async Task<IActionResult> GetReservation(int resevationId)
        {
            if(!_reservationRepository.ReservationExists(resevationId))
                return NotFound(ModelState);

            var reservation = _mapper.Map<ReservationDto>
                (await _reservationRepository.GetReservationAsync(resevationId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(reservation);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetReservationsByUser(int userId)
        {
            var reservations = _mapper.Map<List<ReservationDto>>
                (await _reservationRepository.GetReservationsOfUserAsync(userId));

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(reservations);
        }

        [HttpGet("field/{fieldId}")]
        public async Task<IActionResult> GetReservationsByFiel(int fieldId)
        {
            var reservations = _mapper.Map<List<ReservationDto>>
                (await _reservationRepository.GetReservationOfFieldAsync(fieldId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(reservations);
        }
    }
}
