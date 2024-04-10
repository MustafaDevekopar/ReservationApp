namespace Reservations.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set;}
        public string Text { get; set;}

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public FootballField FootballField { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<View> views { get; set; }
        public ICollection<Comment> comments { get; set; }


    }
}
