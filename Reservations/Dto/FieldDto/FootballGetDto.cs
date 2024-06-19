namespace Reservations.Dto.FieldDto
{
    public class FootballGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        //public string Password { get; set; }
        //public decimal PhoneNumbr { get; set; }
        public string Location { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string Avatar { get; set; }
    }
}
