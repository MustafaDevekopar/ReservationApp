namespace Reservations.Dto.Account
{
    public class UserDetailsDto
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string UserType { get; set; }
        public FootballFieldDto FootballField { get; set; }
    }
}
