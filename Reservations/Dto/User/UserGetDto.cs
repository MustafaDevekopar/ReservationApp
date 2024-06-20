namespace Reservations.Dto.User
{
    public class UserGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Biography { get; set; }
        public DateTime CreatedAt { get; set; }

        public string Avatar { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
