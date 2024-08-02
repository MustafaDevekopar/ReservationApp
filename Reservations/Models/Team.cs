namespace Reservations.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[]? Avatar { get; set; }
        public User TeamLeader { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<UserTeam> UserTeams { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }
    }
}
