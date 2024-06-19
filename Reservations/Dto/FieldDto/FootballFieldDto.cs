namespace Reservations.Dto.FieldDto
{
    public class FootballFieldDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        //public string Password { get; set; }
        //public decimal PhoneNumbr { get; set; }
        public string Location { get; set; }
        public IFormFile? Avatar { get; set; }
    }
}
