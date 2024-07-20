
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
using Reservations.Models;
using Reservations.Repository;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;

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
        private readonly IUserRepository _userRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IReservationRepository _reservationRepository;
        private readonly UserManager<AppUser> _userManager;

        public NotificationController(
            IHubContext<NotificationHub> hubContext, 
            ShareDb shareDb, 
            INotificationRepository notificationRepository, 
            DataContext context, 
            IFootballFieldRepository footballFieldRepository, 
            IUserRepository userRepository, 
            ITeamRepository teamRepository, 
            IReservationRepository reservationRepository,
            UserManager<AppUser> userManager)
        {
            _hubContext = hubContext;
            _shareDb = shareDb;
            _notificationRepository = notificationRepository;
            _context = context;
            _footballFieldRepository = footballFieldRepository;
            _userRepository = userRepository;
            _teamRepository = teamRepository;
            _reservationRepository = reservationRepository;
            _userManager = userManager;
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

        [HttpPut("{notificationId}/markAsRead")]
        public async Task<IActionResult> MarkNotificationAsRead(int notificationId, int userId)
        {
            var userNotification = await _context.UserNotifications
                .FirstOrDefaultAsync(un => un.NotificationId == notificationId && un.UserId == userId);

            if (userNotification == null)
            {
                return NotFound();
            }

            userNotification.IsRead = true;
            await _context.SaveChangesAsync();

            return Ok();
        }

        // isAccepted updating
        [HttpPut("{notificationId}/isAccepted")]
        public async Task<IActionResult> MarkNotificationAsRead(int notificationId, int userId, bool isAccept)
        {
            var userNotification = await _context.UserNotifications
                .FirstOrDefaultAsync(un => un.NotificationId == notificationId && un.UserId == userId);

            if (userNotification == null)
            {
                return NotFound();
            }

            userNotification.isAccept = isAccept;
            await _context.SaveChangesAsync();

            return Ok();
        }
        // add creat notification page
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "MainAdminAdminUser")]
        [HttpPost("createTeamNotification")]
        public async Task<IActionResult> SendToGroup( int teamId, int fieldId, int reservationId)
        {

            // get user by token 
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

            var UserId = user.User.Id;
            if (UserId == null)
            {
                return NotFound("المستخدم غير موجود.");
            }



            var team = await _context.Teams
                 .Include(t => t.UserTeams)
                     .ThenInclude(ut => ut.User)
                 .FirstOrDefaultAsync(t => t.Id == teamId);

            if (team == null)
            {
                return NotFound();
            }

            var teamName = team.Name;

            // Create the notification
            var userGet = await _userRepository.GetUserAsync(UserId);
            var fieldGet = await _footballFieldRepository.GetFootballFieldAsync(fieldId);
            var reservationGet = await _reservationRepository.GetReservationAsync(reservationId);
            var teamGet = await _teamRepository.GetTeamByIdAsync(teamId);

            if (userGet == null || fieldGet == null || reservationGet == null || teamGet == null)
            {
                return NotFound();
            }

            var notification = new Notification
            {
                User = userGet,
                FootballField = fieldGet,
                Team = teamGet,
                Reservation = reservationGet,
                Text = "اشعار"
            };
            int notificationId = await _notificationRepository.CreateNotification(notification);
            if(notificationId == 0)
            {
                ModelState.AddModelError("", "notificationId == 0");
                return BadRequest(ModelState);
            }

            // Add users to UserNotifications
            foreach (var userTeam in team.UserTeams)
            {
                var userNotification = new UserNotification
                {
                    UserId = userTeam.UserId,
                    NotificationId = notificationId,
                    IsRead = false,
                    isAccept = null
                };

                _context.UserNotifications.Add(userNotification);
            }

            await _context.SaveChangesAsync();

            // Send notification to the group
            await _notificationRepository.SendToGroupAsync(teamName, "msg");

            return Ok();
        }

        [HttpGet("user/{userId}/count")]
        public async Task<IActionResult> GetNotificationCountByUserId(int userId)
        {

            // Check if the user exists (optional, depending on your requirements)
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
            {
                return NotFound();
            }

            // Get the count of notifications for the specified user
            var notificationCount = await _context.UserNotifications
                .Where(n => n.User.Id == userId && n.IsRead != true)
                .CountAsync();

            return Ok(notificationCount);
        }



        //[HttpGet("userId/{userId}")]
        //public async Task<IActionResult> GetNotificationsByUserTeams(int userId)
        //{

        //    // Fetch the teams that the user belongs to
        //    var userTeams = await _context.UsersTeams
        //        .Where(ut => ut.UserId == userId)
        //        .Select(ut => ut.TeamId)
        //        .ToListAsync();

        //    // Fetch notifications for those teams including isRead and isAccept status
        //    var notifications = await _context.Notification
        //        .Include(x => x.Team)
        //        .Include(x => x.Reservation)
        //            .ThenInclude(r => r.User)
        //        .Include(x => x.FootballField)
        //        .Include(x => x.UserNotifications) // Include UserNotifications
        //        .Where(x => userTeams.Contains(x.TeamId.Value)) // Filter by user teams
        //        .OrderByDescending(x => x.Reservation.Id)
        //        .ToListAsync();

        //    var notiMap = notifications.Select(x => new NotificationReservationGetDto
        //    {
        //        Id = x.Id,
        //        Text = x.Text,
        //        IsRead = x.UserNotifications.FirstOrDefault(un => un.UserId == userId)?.IsRead ?? false,
        //        IsAccept = x.UserNotifications.FirstOrDefault(un => un.UserId == userId)?.isAccept,
        //        Team = new TeamDto
        //        {
        //            Id = x.Team.Id,
        //            Name = x.Team.Name,
        //        },
        //        Reservation = new ReservationDto
        //        {
        //            Id = x.Reservation.Id,
        //            DateTime = x.Reservation.DateTime,
        //        },
        //        User = new UserMainInfoDto
        //        {
        //            Id = x.Reservation.User.Id,
        //            Name = x.Reservation.User.Name,
        //            Username = x.Reservation.User.Username,
        //            Avatar = (x.Reservation.User.Avatar != null) ? Convert.ToBase64String(x.Reservation.User.Avatar) : null
        //        },
        //        FootballField = new FootballGetDto
        //        {
        //            Id = x.FootballField.Id,
        //            Username = x.FootballField.Username,
        //            Name = x.FootballField.Name,
        //            Avatar = (x.FootballField.Avatar != null) ? Convert.ToBase64String(x.FootballField.Avatar) : null,
        //            Latitude = x.FootballField.Latitude,
        //            Longitude = x.FootballField.Longitude,
        //            Location = x.FootballField.Location,
        //        },
        //    }).ToList();

        //    return Ok(notiMap); // Return an OkObjectResult containing the notifications
        //}

        [HttpGet("userId/{userId}")]
        public async Task<IActionResult> GetNotificationsByUserTeams(int userId, [FromQuery] int page, [FromQuery] int pageSize)
        {
            // Fetch the teams that the user belongs to
            var userTeams = await _context.UsersTeams
                .Where(ut => ut.UserId == userId)
                .Select(ut => ut.TeamId)
                .ToListAsync();

            // Fetch notifications for those teams including isRead and isAccept status
            var notificationsQuery = _context.Notification
                .Include(x => x.Team)
                .Include(x => x.Reservation)
                    .ThenInclude(r => r.User)
                .Include(x => x.FootballField)
                .Include(x => x.UserNotifications) // Include UserNotifications
                .Where(x => userTeams.Contains(x.TeamId.Value)) // Filter by user teams
                .OrderByDescending(x => x.Reservation.Id);

            // Implement pagination
            var notifications = await notificationsQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalNotifications = await notificationsQuery.CountAsync();

            var notiMap = notifications.Select(x => new NotificationReservationGetDto
            {
                Id = x.Id,
                Text = x.Text,
                IsRead = x.UserNotifications.FirstOrDefault(un => un.UserId == userId)?.IsRead ?? false,
                IsAccept = x.UserNotifications.FirstOrDefault(un => un.UserId == userId)?.isAccept,
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
                    Id = x.Reservation.User.Id,
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
                },
            }).ToList();

            return Ok(new
            {
                Notifications = notiMap,
                TotalNotifications = totalNotifications
            });
        }



        [HttpGet("fieldId/{fieldId}")]
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
                .Where(x => x.FootballField.Id == fieldId) 
                .OrderByDescending(x => x.Reservation.DateTime) 
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

            return Ok(notiMap); 
        }

        //get notification by id to show notification page

        [HttpGet("{notificationId}")]
        public async Task<IActionResult> GetNotificationById(int notificationId)
        {
            var notification = await _context.Notification
                .Include(x => x.Team)
                    .ThenInclude(t => t.UserTeams)
                        .ThenInclude(ut => ut.User)
                .Include(x => x.Reservation)
                    .ThenInclude(r => r.User)
                .Include(x => x.FootballField)
                .Include(x => x.UserNotifications)
                    .ThenInclude(un => un.User)
                .FirstOrDefaultAsync(x => x.Id == notificationId);

            if (notification == null)
            {
                return NotFound();
            }

            var notiMap = new NotificationReservationGetDto
            {
                Id = notification.Id,
                Text = notification.Text,
                Team = new TeamDto
                {
                    Id = notification.Team.Id,
                    Name = notification.Team.Name,
                    Avatar = notification.Team.Avatar != null ? Convert.ToBase64String(notification.Team.Avatar) : null,
                },
                Reservation = new ReservationDto
                {
                    Id = notification.Reservation.Id,
                    DateTime = notification.Reservation.DateTime,
                },
                User = new UserMainInfoDto
                {
                    Id = notification.Reservation.User.Id,
                    Name = notification.Reservation.User.Name,
                    Username = notification.Reservation.User.Username,
                    Avatar = notification.Reservation.User.Avatar != null ? Convert.ToBase64String(notification.Reservation.User.Avatar) : null
                },
                FootballField = new FootballGetDto
                {
                    Id = notification.FootballField.Id,
                    Username = notification.FootballField.Username,
                    Name = notification.FootballField.Name,
                    Avatar = notification.FootballField.Avatar != null ? Convert.ToBase64String(notification.FootballField.Avatar) : null,
                    Latitude = notification.FootballField.Latitude,
                    Longitude = notification.FootballField.Longitude,
                    Location = notification.FootballField.Location,
                },
                UserNotifications = notification.UserNotifications.Select(un => new UserNotificationDto
                {
                    Id = un.UserId,
                    Name = un.User.Name,
                    Username = un.User.Username,
                    Avatar = un.User.Avatar != null ? Convert.ToBase64String(un.User.Avatar) : null,
                    IsRead = un.IsRead,
                    IsAccepted = un.isAccept
                }).ToList()
            };

            return Ok(notiMap);
        }




    }
}

