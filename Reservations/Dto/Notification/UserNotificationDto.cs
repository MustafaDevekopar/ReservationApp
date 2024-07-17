namespace Reservations.Dto.Notification
{
    public class UserNotificationDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Avatar { get; set; }
        public bool IsRead { get; set; }
        public bool? IsAccepted { get; set; }
    }
}
