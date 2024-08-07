﻿using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Dto.FieldDto;
using Reservations.Dto.Reservation;
using Reservations.Hubs;
using Reservations.Interfaces;
using Reservations.Models;
using Reservations.Repository;
using System.Security.Claims;

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
        private readonly INotificationRepository _notificationRepository;
        public ReservationController(IReservationRepository reservationRepository,
             IFootballFieldRepository footballFieldRepository,
             IUserRepository userRepository,
             IMapper mapper,
             DataContext context,
             UserManager<AppUser> userManager,
             INotificationRepository notificationRepository)
        {
            _reservationRepository = reservationRepository;
            _footballFieldRepository = footballFieldRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
            _notificationRepository = notificationRepository;
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
        }
        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "FieldOwner")]



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
            // i need to send notification to user hear
            return Ok(ReseDto);

        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetReservationsByUser(int userId)
        {
            var reservations = await _reservationRepository.GetReservationsOfUserAsync(userId);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(reservations);
        }

        [HttpGet("field/{fieldId}")]
        public async Task<IActionResult> GetReservationsByField(int fieldId)
        {
            var reservations = _mapper.Map<List<ReservationDto>>
                (await _reservationRepository.GetReservationOfFieldAsync(fieldId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(reservations);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "FieldOwner")]
        [HttpGet("MyReservationsField")]
        public async Task<IActionResult> GetMyReservationsField()
        {
            var phoneClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.MobilePhone);
            if (phoneClaim == null)
            {
                return Unauthorized("التوكن غير صالح أو مفقود.");
            }

            var phoneNumber = phoneClaim.Value;
            // Get user from token information
            var user = await _userManager.Users.Include(u => u.FootballField)
                                           .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
            if (user == null)
            {
                return Unauthorized("لا تملك صلاحية الوصول!!");
            }

            var footballField_id = user.FootballField.Id;
            if (footballField_id == null)
            {
                return NotFound("ملعب كرة القدم غير موجود.");
            }

            var reservations = await _context.Reservations
                        .Include(u => u.User)
                        .Where(r => r.FootballField.Id == footballField_id)
                        .ToListAsync();

            if (reservations == null) return NotFound(ModelState);
            
            var ReseravtionMap = reservations.Select(reservation =>
            {
                var phoneUser = _userManager.Users
                    .Where(u => u.UserId == reservation.User.Id)
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
                        Id = footballField_id
                    }
                };

            }).ToList();

            return Ok(ReseravtionMap);
        }


        // =========== get reservations of user by token =========

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "MainAdminAdminUser")]
        [HttpGet("MyReservationsUser")]
        public async Task<IActionResult> GetMyReservationsUser()
        {
            var phoneClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.MobilePhone);
            if (phoneClaim == null)
            {
                return Unauthorized("التوكن غير صالح أو مفقود.");
            }

            var phoneNumber = phoneClaim.Value;
            // Get user from token information
            var user = await _userManager.Users.Include(u => u.User)
                                           .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
            if (user == null)
            {
                return Unauthorized("لا تملك صلاحية الوصول!!");
            }

            var user_id = user.User.Id;
            if (user_id == null)
            {
                return NotFound("المستخدم غير موجود.");
            }

            var reservations = await _context.Reservations
                        .Include(u => u.FootballField)
                        .Where(r => r.User.Id == user_id)
                        .ToListAsync();

            if (reservations == null) return NotFound(ModelState);
            
            var ReseravtionMap = reservations.Select(reservation =>
            {

                var phoneField = _userManager.Users
                    .Where(u => u.FootballFieldId == reservation.FootballField.Id)
                    .Select(x => x.PhoneNumber)
                    .FirstOrDefault();

                return new ReservationFieldUserGetDto
                {
                    Id = reservation.Id,
                    DateTime = reservation.DateTime,
                    fieldGet = new FieldInReservation
                    {
                        Id = reservation.FootballField.Id,
                        Name = reservation.FootballField.Name,
                        Username = reservation.FootballField.Username,
                        PhoneNumber = phoneField,
                        Avatar = reservation.FootballField.Avatar != null
                                    ? Convert.ToBase64String(reservation.FootballField.Avatar)
                                    : null,
                    },
                    userGet = new UserInReservation
                    {
                        Id = user_id
                    }

                };

            }).ToList();
            return Ok(ReseravtionMap);
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "MainAdminAdminUser")]
        [HttpPost]
        public async Task<IActionResult> CreateReservation(
                    [FromBody] ReservationDto ReservationCreate,
                    [FromQuery] int fieldId)
        {
            if (ReservationCreate == null)
                return BadRequest(ModelState);
            // get userReservation owner by using token 
            var phoneClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.MobilePhone);
            if (phoneClaim == null)
            {
                return Unauthorized("التوكن غير صالح أو مفقود.");
            }
            var phoneNumber = phoneClaim.Value;
            // Get user from token information
            var user = await _userManager.Users
                                    .Include(u => u.User)
                                    .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);


            if (user == null)
            {
                return Unauthorized("لا تملك صلاحية الوصول!!");
            }
            var userxx = await _userManager.Users

                        .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);

            var MyuserId = user.User.Id;
                if (MyuserId == null)
                {
                    return NotFound("المستخدم غير موجود.");
                }
    
                var resMap = _mapper.Map<Reservation>(ReservationCreate);
                resMap.FootballField = await _footballFieldRepository.GetFootballFieldAsync(fieldId);

                resMap.User = await _userRepository.GetUserAsync(MyuserId);

            var reservationId = await _reservationRepository.CreateReservation(resMap);
            if (reservationId == 0)
            {
                ModelState.AddModelError("", "Something woring while savin");
                return BadRequest(ModelState);
            }

           // await _notificationRepository.CreateNotification(MyuserId, fieldId,reservationId, 1);//(int userId, int fieldId, int reservationId, int teamId)

            return Ok("Successfully Created");
        }


        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "FieldOwnerUser")]
        [HttpDelete("{ReservationId}")]
        public async Task<IActionResult> DeleteReservation(int ReservationId)
        {
            if (!_reservationRepository.ReservationExists(ReservationId))
                return NotFound();

            //var resToDelete = await _reservationRepository.GetReservationAsync(ReservationId);
            var resToDelete = _context.Reservations
                        .Include(r => r.Notifications)  // Ensure related notifications are loaded
                        .FirstOrDefault(r => r.Id == ReservationId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_reservationRepository.DeleteReservation(resToDelete))
                ModelState.AddModelError("", "Something went wring deleting");

            return NoContent();
            //return Ok("تم الحذف بنجاح");

        }
    }
}
