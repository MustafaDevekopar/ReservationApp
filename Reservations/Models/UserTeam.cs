namespace Reservations.Models
{
    public class UserTeam
    {
        public int UserId { get; set; }
        public int TeamId { get; set; }
        public User User { get; set; }
        public Team Team { get; set; }
    }
}
