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
    public class ReservationStatusController : ControllerBase
    {
        private readonly IReservationStatusRepository _reservationStatusRepository;
        private readonly IFootballFieldRepository _footballFieldRepository;
        private readonly IMapper _mapper;
        public ReservationStatusController(IReservationStatusRepository reservationStatusRepository, 
            IFootballFieldRepository footballFieldRepository,
            IMapper mapper)
        {
            _reservationStatusRepository = reservationStatusRepository;
            _footballFieldRepository = footballFieldRepository;
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

        // post 
        [HttpPost]
        public async Task<IActionResult> CreateReservationStatus([FromBody]ReservationStatusDto ReservationStatusCreate)
        {
            if (ReservationStatusCreate == null)
                return BadRequest(ModelState);

            var resMap = _mapper.Map<ReservationStatus>(ReservationStatusCreate);
            if (!_reservationStatusRepository.CreareReservationStatus(resMap))
            {
                ModelState.AddModelError("", "Something woring while savin");
                return BadRequest(ModelState);
            }
            return Ok("Successfully Created");


        }

        [HttpPut("{resStatusId}")]
        public IActionResult UpdateReservationStatus(int resStatusId, 
            [FromBody] ReservationStatusDto updateResStatus)
        {
            if (updateResStatus == null)
                return BadRequest();

            if (resStatusId != updateResStatus.Id)
                return BadRequest(ModelState);

            if (!_reservationStatusRepository.ReservationStatusExists(resStatusId))
                return NotFound(ModelState);

            if (!ModelState.IsValid)
                return BadRequest();

            var resStatusMap = _mapper.Map<ReservationStatus>(updateResStatus);

            if (!_reservationStatusRepository.UpdateReservationStatus(resStatusMap))
            {
                ModelState.AddModelError("", "Somthing went woring while updating");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
