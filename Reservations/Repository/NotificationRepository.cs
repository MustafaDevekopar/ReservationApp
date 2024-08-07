﻿
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
        private readonly IUserRepository _userRepository;
        private readonly IFootballFieldRepository _footballFieldRepository;
        private readonly IReservationRepository _reservationRepository;
        private readonly ITeamRepository _teamRepository;

        public NotificationRepository(IHubContext<NotificationHub> hubContext, ShareDb shareDb, 
                    DataContext context, IUserRepository userRepository,
                    IFootballFieldRepository footballFieldRepository, 
                    IReservationRepository reservationRepository,
                    ITeamRepository teamRepository
                   )
        {
            _hubContext = hubContext;
            _shareDb = shareDb;
            _context = context;
            _userRepository = userRepository;
            _footballFieldRepository = footballFieldRepository;
            _reservationRepository = reservationRepository;
            _teamRepository = teamRepository;
        }
        // notification  services signalR
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

        // notification table to transfer data as controller
        public async Task<List<Notification>> GetNotificationsAsync()
        {
            return await _context.Notification.Include(r => r.Reservation).ToListAsync();
        }
        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public async Task<int> CreateNotification(Notification notification)
        {
            await _context.Notification.AddAsync(notification);
            var saved = await _context.SaveChangesAsync();
            return saved > 0 ? notification.Id : 0;
        }
    }
}
