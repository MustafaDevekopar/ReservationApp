namespace Reservations.Dto.Team
{
    public class TeamCreatDto
    {
        public int TeamLeaderId { get; set; }
        public string Name { get; set; }
        public IFormFile? Avatar { get; set; }
    }
}
