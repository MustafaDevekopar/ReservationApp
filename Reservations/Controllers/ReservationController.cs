using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Dto.FieldDto;
using Reservations.Dto.Reservation;
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
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        public ReservationController(IReservationRepository reservationRepository,
             IFootballFieldRepository footballFieldRepository,
             IUserRepository userRepository,
             IMapper mapper,
             DataContext context,
             UserManager<AppUser> userManager)
        {
            _reservationRepository = reservationRepository;
            _footballFieldRepository = footballFieldRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetReservations()
        {
            var reservations = await _context.Reservations
                        .Include(u => u.User)
                        .Include(f => f.FootballField)
                        .ToListAsync();

            if (reservations == null) return NotFound(ModelState);
            //var usersMap = users.Select(user =>
            var ReseravtionMap = reservations.Select( reservation =>
            {
                var phoneUser =  _userManager.Users
                    .Where(u => u.UserId == reservation.User.Id)
                    .Select(x => x.PhoneNumber)
                    .FirstOrDefault();

                var phoneField =  _userManager.Users
                    .Where(u => u.FootballFieldId == reservation.FootballField.Id)
                    .Select(x => x.PhoneNumber)
                    .FirstOrDefault();

                return new ReservationFieldUserGetDto
                {
                    Id = reservation.Id,
                    DateTime = reservation.DateTime,
                    userGet = new UserInReservation
                    {
                        Id = reservation.User.Id,
                        Name = reservation.User.Name,
                        Username = reservation.User.Username,
                        PhoneNumber = phoneUser,
                        Avatar = reservation.User.Avatar != null 
                                    ? Convert.ToBase64String(reservation.User.Avatar) 
                                    : null,

                    },
                    fieldGet = new FieldInReservation
                    {
                        Id = reservation.FootballField.Id,
                        Name = reservation.FootballField.Name,
                        Username = reservation.FootballField.Username,
                        PhoneNumber = phoneField,
                        Avatar = reservation.FootballField.Avatar != null 
                                    ? Convert.ToBase64String(reservation.FootballField.Avatar) 
                                    : null,
                    }

                };
                


            }).ToList();
            return Ok(ReseravtionMap);
            //var reservations = _mapper.Map<List<ReservationDto>>
            //    (await _reservationRepository.GetReservationsAsync());

            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);

            //return Ok(reservations);
        }



        [HttpGet("{resevationId}")]
        public async Task<IActionResult> GetReservation(int resevationId)
        {
            if(!_reservationRepository.ReservationExists(resevationId))
                return NotFound(ModelState);

            var reservation = await _context.Reservations
                .Include(u => u.User)
                .Include(f => f.FootballField)
                .FirstOrDefaultAsync(x => x.Id == resevationId);

            if(reservation == null) return NotFound(ModelState);

            var ReseDto = new ReservationFieldUserGetDto
            {
                Id = reservation.Id,
                DateTime = reservation.DateTime,
                userGet = new UserInReservation
                {
                    Id = reservation.User.Id,
                    Name = reservation.User.Name,
                    Username = reservation.User.Username,
                    Avatar = reservation.User.Avatar != null 
                                    ? Convert.ToBase64String(reservation.User.Avatar) 
                                    : null,
                },
                fieldGet = new FieldInReservation
                {
                    Id = reservation.FootballField.Id,
                    Name = reservation.FootballField.Name,
                    Username = reservation.FootballField.Username,
                    Avatar = reservation.FootballField.Avatar != null 
                                            ? Convert.ToBase64String(reservation.FootballField.Avatar) 
                                            : null,

                }

            };

            ReseDto.userGet.PhoneNumber = await _userManager.Users      
                                .Where(u => u.UserId == ReseDto.userGet.Id)
                                .Select(x => x.PhoneNumber)
                                .FirstOrDefaultAsync();

            ReseDto.fieldGet.PhoneNumber = await _userManager.Users
                                .Where(u => u.FootballFieldId == ReseDto.fieldGet.Id)
                                .Select(x => x.PhoneNumber)
                                .FirstOrDefaultAsync();
  
            return Ok(ReseDto);


            //var reservation = _mapper.Map<ReservationDto>
            //    (await _reservationRepository.GetReservationAsync(resevationId));

                //if (!ModelState.IsValid)
                //    return BadRequest(ModelState);

            //return Ok(reservation);
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
