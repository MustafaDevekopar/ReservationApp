namespace Reservations.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public decimal PhoneNumbr { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ICollection<Like> Likes { get; set; }
        public ICollection<View> views { get; set; }
        public ICollection<Comment> comments { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
        public ICollection<UserField> UserFields { get; set; }

    }
}
