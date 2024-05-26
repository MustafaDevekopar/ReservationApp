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
    public class ReservationController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IFootballFieldRepository _footballFieldRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public ReservationController(IReservationRepository reservationRepository,
             IFootballFieldRepository footballFieldRepository,
             IUserRepository userRepository,
             IMapper mapper)
        {
            _reservationRepository = reservationRepository;
            _footballFieldRepository = footballFieldRepository;
            _userRepository = userRepository;
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
            var reservations = await _reservationRepository.GetReservationsOfUserAsync(userId);
            //var reservations = _mapper.Map<List<ReservationDto>>
            //           (await _reservationRepository.GetReservationsOfUserAsync(userId));
            if (!ModelState.IsValid)
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

        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody] ReservationDto ReservationCreate,
            [FromQuery] int fieldId, 
            [FromQuery] int uderId)
        {
            if (ReservationCreate == null)
                return BadRequest(ModelState);

            var resMap = _mapper.Map<Reservation>(ReservationCreate);
            resMap.FootballField = await _footballFieldRepository.GetFootballFieldAsync(fieldId);
            resMap.User = await _userRepository.GetUserAsync(uderId);
            if (!_reservationRepository.CreateReservation(resMap))
            {
                ModelState.AddModelError("", "Something woring while savin");
                return BadRequest(ModelState);
            }
            return Ok("Successfully Created");
        }

        [HttpDelete("{ReservationId}")]
        public async Task<IActionResult> DeleteReservation(int ReservationId)
        {
            if (!_reservationRepository.ReservationExists(ReservationId))
                return NotFound();

            var resToDelete = await _reservationRepository.GetReservationAsync(ReservationId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_reservationRepository.DeleteReservation(resToDelete))
                ModelState.AddModelError("", "Something went wring deleting");

            return NoContent();

        }
    }
}
