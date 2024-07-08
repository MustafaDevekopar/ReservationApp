namespace Reservations.Models
{
    public class UserNotification
    {
        public int UserId { get; set; }
        public int NotificationId { get; set; }  


        public User User { get; set; }
        public Notification Notification { get; set; }


        public bool IsRead { get; set; } = false;
        public bool? isAccept {  get; set; } = null;
    }
}
