namespace Reservations.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string Username { get; set; }
        public string? Biography { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public byte[]? Avatar { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }

        public ICollection<Like> Likes { get; set; }
        public ICollection<View> views { get; set; }
        public ICollection<Comment> comments { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
        public ICollection<UserField> UserFields { get; set; }

        public virtual AppUser AppUser { get; set; }
        public ICollection<UserTeam> UserTeams { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }

    }
}
