using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Reservations.Hubs;
using Reservations.Interfaces;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly ShareDb _shareDb;
        private readonly INotificationRepository _notificationRepository;

        public NotificationController(IHubContext<NotificationHub> hubContext, ShareDb shareDb, INotificationRepository notificationRepository)
        {
            _hubContext = hubContext;
            _shareDb = shareDb;
            _notificationRepository = notificationRepository;
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
    }

}
