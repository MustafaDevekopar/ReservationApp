namespace Reservations.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public User TeamLeader { get; set; }
        public ICollection<UserTeam> UserTeams { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }
    }
}
