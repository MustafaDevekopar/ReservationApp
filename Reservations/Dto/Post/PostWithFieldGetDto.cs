namespace Reservations.Dto.Post
{
    public class PostWithFieldGetDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string? Image { get; set; }

        public FieldOfPostDto Field { get; set; }
    }
}
