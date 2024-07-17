using Reservations.Dto.User;

namespace Reservations.Dto.Team
{
    public class TeamDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Avatar { get; set; }
        public UserInTeamGetDto TeamLeader { get; set; }
        public ICollection<UserInTeamGetDto> Users { get; set; }
    }
}
