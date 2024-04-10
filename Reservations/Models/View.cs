namespace Reservations.Models
{
    public class View
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;

        public User User { get; set; }
        public Post Post { get; set; }
    }
}
