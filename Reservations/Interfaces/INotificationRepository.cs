namespace Reservations.Interfaces
{
    public interface INotificationRepository
    {
        Task<bool> SendToUserAsync(string userId, string message);
        Task<bool> SendToGroupAsync(string groupName, string message);
        Task<bool> SendToAllAsync(string message);
    }
}
