using Reservations.Dto.Post;
using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface INotificationRepository
    {
        // notification table services signalR
        Task<bool> SendToUserAsync(string userId, string message);
        Task<bool> SendToGroupAsync(string groupName, string message);
        Task<bool> SendToAllAsync(string message);

        // notification table to transfer data as controller
        Task<List<Notification>> GetNotificationsAsync();
        Task<int> CreateNotification(Notification notification);
        bool Save();
    }
}
