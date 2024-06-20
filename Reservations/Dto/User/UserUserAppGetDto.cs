using Reservations.Dto.FieldDto;

namespace Reservations.Dto.User
{
    public class UserUserAppGetDto
    {
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? AccountType { get; set; }
        public UserGetDto UserGet { get; set; }
    }
}
