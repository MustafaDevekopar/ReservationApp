
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Reservations.Dto.FieldDto;
using Reservations.Dto;
using Reservations.Hubs;
using Reservations.Interfaces;
using Reservations.Data;
using Microsoft.EntityFrameworkCore;
using Reservations.Dto.Notification;
using Reservations.Dto.User;
using Reservations.Dto.Reservation;
using Reservations.Dto.Team;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly ShareDb _shareDb;
        private readonly INotificationRepository _notificationRepository;
        private readonly DataContext _context;
        private readonly IFootballFieldRepository _footballFieldRepository;

        public NotificationController(IHubContext<NotificationHub> hubContext, ShareDb shareDb, 
                INotificationRepository notificationRepository, DataContext context, IFootballFieldRepository footballFieldRepository)
        {
            _hubContext = hubContext;
            _shareDb = shareDb;
            _notificationRepository = notificationRepository;
            _context = context;
            _footballFieldRepository = footballFieldRepository;
        }

        [HttpPost("send-to-all")]
        public async Task<IActionResult> SendToAll([FromBody] string message)
        {
            await _notificationRepository.SendToAllAsync(message);
            return Ok();
        }

        [HttpPost("send-to-group")]
        public async Task<IActionResult> SendToGroup(string groupName, [FromBody] string message)
        {
            await _notificationRepository.SendToGroupAsync(groupName, message);
            return Ok();
        }

        [HttpPost("send-to-user")]
        public async Task<IActionResult> SendToUser(string userId, [FromBody] string message)
        {
            bool send = await _notificationRepository.SendToUserAsync(userId, message);

            if (send) return Ok();

            return NotFound();
        }


        //[HttpGet]
        //public async Task<IActionResult> GetAll()
        //{
        //    var notifications = await _notificationRepository.GetNotificationsAsync();

        //    if(notifications == null) 
        //        return NotFound();

        //    return Ok(notifications);
        //}



        //[HttpGet("teamName")]
        //public async Task<IActionResult> GerNotification(string teamName)
        //{
        //    // Ensure the User navigation property is included
        //    var notifications = await _context.Notification
        //        .Include(x => x.Reservation)
        //            .ThenInclude(r => r.User)
        //            .Include(x => x.FootballField)
        //            .Where(x => x.Team.Name == teamName) // corrected the error here
        //            .ToListAsync();
        //    var notiMap = notifications.Select(x => new NotificationReservationGetDto
        //    {
        //        Id = x.Id,
        //        Text = x.Text,
        //        Reservation = new ReservationDto
        //        {
        //            Id = x.Reservation.Id,
        //            DateTime = x.Reservation.DateTime,
        //        },
        //        User = new UserMainInfoDto
        //        {
        //            Id = x.Id,
        //            Name = x.User.Name,
        //            Username = x.User.Username,
        //            Avatar = (x.User.Avatar == null)? Convert.ToBase64String(x.User.Avatar) : null
        //        },
        //        FootballField = new FootballGetDto
        //        {
        //            Id = x.FootballField.Id,
        //            Username = x.FootballField.Username,
        //            Name = x.FootballField.Name,
        //            Avatar = (x.FootballField.Avatar == null) ? Convert.ToBase64String(x.FootballField.Avatar) : null,
        //            Latitude = x.FootballField.Latitude,
        //            Longitude = x.FootballField.Longitude,
        //            Location = x.FootballField.Location,
        //        }
        //    }).ToList();

        //    return Ok(notiMap); // Return an OkObjectResult containing the userDtos
        //}

        [HttpGet("userId/{userId}")]
        public async Task<IActionResult> GetNotificationsByUserTeams(int userId)
        {
            // Fetch the teams that the user belongs to
            var userTeams = await _context.UsersTeams
                .Where(ut => ut.UserId == userId)
                .Select(ut => ut.TeamId)
                .ToListAsync();

            // Fetch notifications for those teams
            var notifications = await _context.Notification
                .Include(x => x.Team)
                .Include(x => x.Reservation)
                    .ThenInclude(r => r.User)
                    .Include(x => x.FootballField)
                    .Where(x => userTeams.Contains(x.TeamId.Value)) // Filter by user teams
                    .OrderByDescending(x => x.Reservation.Id)
                .ToListAsync();

            var notiMap = notifications.Select(x => new NotificationReservationGetDto
            {
                Id = x.Id,
                Text = x.Text,
                Team = new TeamDto
                {
                    Id = x.Team.Id,
                    Name = x.Team.Name,
                },
                Reservation = new ReservationDto
                {
                    Id = x.Reservation.Id,
                    DateTime = x.Reservation.DateTime,
                },
                User = new UserMainInfoDto
                {
                    Id = x.Reservation.User.Id, // Corrected to reference x.Reservation.User.Id
                    Name = x.Reservation.User.Name,
                    Username = x.Reservation.User.Username,
                    Avatar = (x.Reservation.User.Avatar != null) ? Convert.ToBase64String(x.Reservation.User.Avatar) : null
                },
                FootballField = new FootballGetDto
                {
                    Id = x.FootballField.Id,
                    Username = x.FootballField.Username,
                    Name = x.FootballField.Name,
                    Avatar = (x.FootballField.Avatar != null) ? Convert.ToBase64String(x.FootballField.Avatar) : null,
                    Latitude = x.FootballField.Latitude,
                    Longitude = x.FootballField.Longitude,
                    Location = x.FootballField.Location,
                }
            }).ToList();

            return Ok(notiMap); // Return an OkObjectResult containing the userDtos
        }



        [HttpGet("footballFieldId/{fieldId}")]
        public async Task<IActionResult> GetNotificationsByFootballFieldId(int fieldId)
        {
            if (!_footballFieldRepository.FootballFieldExists(fieldId))
            {
                return NotFound();
            }
               
            // Fetch notifications for the specified football field
            var notifications = await _context.Notification
                .Include(x => x.Team)
                .Include(x => x.Reservation)
                    .ThenInclude(r => r.User)
                .Include(x => x.FootballField)
                .Where(x => x.FootballField.Id == fieldId) // Filter by football field
                .OrderByDescending(x => x.Reservation.DateTime) // Order by reservation DateTime in descending order
                .ToListAsync();

            var notiMap = notifications.Select(x => new NotificationReservationGetDto
            {
                Id = x.Id,
                Text = x.Text,
                Team = new TeamDto
                {
                    Id = x.Team.Id,
                    Name = x.Team.Name,
                },
                Reservation = new ReservationDto
                {
                    Id = x.Reservation.Id,
                    DateTime = x.Reservation.DateTime,
                },
                User = new UserMainInfoDto
                {
                    Id = x.Reservation.User.Id, // Corrected to reference x.Reservation.User.Id
                    Name = x.Reservation.User.Name,
                    Username = x.Reservation.User.Username,
                    Avatar = (x.Reservation.User.Avatar != null) ? Convert.ToBase64String(x.Reservation.User.Avatar) : null
                },
                FootballField = new FootballGetDto
                {
                    Id = x.FootballField.Id,
                    Username = x.FootballField.Username,
                    Name = x.FootballField.Name,
                    Avatar = (x.FootballField.Avatar != null) ? Convert.ToBase64String(x.FootballField.Avatar) : null,
                    Latitude = x.FootballField.Latitude,
                    Longitude = x.FootballField.Longitude,
                    Location = x.FootballField.Location,
                }
            }).ToList();

            return Ok(notiMap); // Return an OkObjectResult containing the notifications
        }


    }
}

