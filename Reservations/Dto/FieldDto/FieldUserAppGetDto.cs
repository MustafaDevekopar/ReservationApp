namespace Reservations.Dto.FieldDto
{
    public class FieldUserAppGetDto
    {
            public string? Id { get; set; }
            public string? UserName { get; set; }
            public string? PhoneNumber { get; set; }
            public string? AccountType { get; set; }
            public FieldGetDto UserGet { get; set; }
    }
}
