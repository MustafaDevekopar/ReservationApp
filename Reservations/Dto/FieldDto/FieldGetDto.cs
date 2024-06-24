namespace Reservations.Dto.FieldDto
{
    public class FieldGetDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string Username { get; set; }
        public string? Biography { get; set; }
        public string? Location { get; set; }
        public string? Avatar { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public DateTime CreatedAt { get; set; }
        public int OpeningDays { get; set; } = 7;
        public string? OpeningHouer { get; set; }
        public GovernorateDto GovernorateGet { get; set; }
        public CategoryDto CategoryGet { get; set; }

    }
}
