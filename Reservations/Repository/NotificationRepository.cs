
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Hubs;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Repository
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly ShareDb _shareDb;
        private readonly DataContext _context;

        public NotificationRepository(IHubContext<NotificationHub> hubContext, ShareDb shareDb, DataContext context)
        {
            _hubContext = hubContext;
            _shareDb = shareDb;
            _context = context;

        }

        public async Task<bool> SendToAllAsync(string message)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", message);
            return true;
        }

        public async Task<bool> SendToGroupAsync(string groupName, string message)
        {
            await _hubContext.Clients.Group(groupName).SendAsync("ReceiveMessage", message);
            return true;
        }

        public async Task<bool> SendToUserAsync(string userId, string message)
        {
            var connectionId = _shareDb.UserConnections.FirstOrDefault(x => x.Value == userId).Key;

            if (connectionId == null)
                return false;

            await _hubContext.Clients.Client(connectionId).SendAsync("ReceiveMessage", message);
            return true;
        }

        // notification transfer data as controller
        //public async Task<List<Notification>> GetNotificationsAsync()
        //{
        //    return await _context.Notification.ToListAsync();
        //}
    }
}
