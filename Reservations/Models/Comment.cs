namespace Reservations.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;

        public User User { get; set; }
        public Post Post { get; set; }
    }
}
