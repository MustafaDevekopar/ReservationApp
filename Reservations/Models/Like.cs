namespace Reservations.Models
{
    public class Like
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;

        public User User { get; set; }
        public Post Post { get; set; }
    }
}
