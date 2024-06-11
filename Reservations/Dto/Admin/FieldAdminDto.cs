namespace Reservations.Dto.Admin
{
    public class FieldAdminDto
    {
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? AccountType { get; set; }
        public FootballFieldGetDto FieldGet { get; set; }
    }
}
