namespace Reservations.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public User User { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public FootballField FootballField { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }
    }
}
