namespace Reservations.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public decimal PhoneNumbr { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
