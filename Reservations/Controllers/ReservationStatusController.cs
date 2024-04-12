using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto;
using Reservations.Interfaces;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationStatusController : ControllerBase
    {
        private readonly IReservationStatusRepository _reservationStatusRepository;
        private readonly IMapper _mapper;
        public ReservationStatusController(IReservationStatusRepository reservationStatusRepository, 
            IMapper mapper)
        {
            _reservationStatusRepository = reservationStatusRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetGovernorates()
        {
            var rstat = _mapper.Map<List<ReservationStatusDto>>
                (await _reservationStatusRepository.GetReservationStatusAsync());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(rstat);
        }

        [HttpGet("{reservationStatusId}")]
        public async Task<IActionResult> GetGovernorate(int reservationStatusId)
        {
            if (!_reservationStatusRepository.ReservationStatusExists(reservationStatusId))
                return NotFound(ModelState);

            var governorate = _mapper.Map<ReservationStatusDto>
                (await _reservationStatusRepository.GetReservationStatusByIdAsync(reservationStatusId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(governorate);
        }
    }
}
