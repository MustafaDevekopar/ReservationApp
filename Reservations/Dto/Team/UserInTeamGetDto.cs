namespace Reservations.Dto.Team
{
    public class UserInTeamGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Avatar { get; set; }
        public bool IsTeamLeader { get; set; }
    }
}
