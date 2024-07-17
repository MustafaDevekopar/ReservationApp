using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Reservations.Data;
using Reservations.Dto.FieldDto;
using Reservations.Dto.Team;
using Reservations.Dto.User;
using Reservations.Interfaces;
using Reservations.Models;
using Reservations.Repository;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamRepository _teamRepository;
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        public TeamController(ITeamRepository teamRepository, DataContext context, IUserRepository userRepository)
        {
            _teamRepository = teamRepository;
            _context = context;
            _userRepository = userRepository;

        }
        [HttpGet("teamId")]
        public async Task<IActionResult> GetTeambyIdAsync(int teamId)
        {
            var team = await _context.Teams
                 .Include(t => t.UserTeams)
                     .ThenInclude(ut => ut.User)
                 .FirstOrDefaultAsync(t => t.Id == teamId);

            if (team == null)
            {
                return null;
            }

            // Manual mapping
            var teamDto = new TeamDto
            {
                Id = team.Id,
                Name = team.Name,
                Avatar = (team.Avatar != null) ? Convert.ToBase64String(team.Avatar) : null,
                //TeamLeader = new UserGetDto
                //{
                //    Id = team.TeamLeader.Id,
                //    Name = team.TeamLeader.Name,
                //    Username = team.TeamLeader.Username,
                //    Avatar = (team.TeamLeader.Avatar != null) ? Convert.ToBase64String(team.TeamLeader.Avatar) : null,
                //},
                Users = team.UserTeams.Select(ut => new UserInTeamGetDto
                {
                    Id = ut.User.Id,
                    Name = ut.User.Name,
                    Username = ut.User.Username,
                    //Avatar = (ut.User.Avatar != null) ? Convert.ToBase64String(ut.User.Avatar) : null,
                }).ToList()
            };

            return Ok(teamDto);
        }


        [HttpGet("userId")]
        public async Task<IActionResult> GetTeamByUserIdAsync(int userId)
        {

            var team = await _context.UsersTeams
                    .Include(ut => ut.Team) // Include the Team
                        .ThenInclude(t => t.UserTeams) // Then include the UserTeams in the Team
                            .ThenInclude(ut => ut.User) // Then include the Users in the UserTeams
                    .Where(ut => ut.UserId == userId)
                    .Select(ut => ut.Team)
                    .FirstOrDefaultAsync();

            if (team == null)
            {
                return null;
            }

            // Manual mapping to DTO (you can use AutoMapper instead)
            var teamDto = new TeamDto
            {
                Id = team.Id,
                Name = team.Name,

                Users = team.UserTeams.Select(ut => new UserInTeamGetDto
                {
                    Id = ut.User.Id,
                    Name = ut.User.Name,
                    Username = ut.User.Username,
                    Avatar = (ut.User.Avatar != null) ? Convert.ToBase64String(ut.User.Avatar) : null,
                }).ToList()
            };

            return Ok( teamDto);
        }


        [HttpGet("user/{userId}/teams")]
        public async Task<IActionResult> GetAllTeamsByUserIdAsync(int userId)
        {
            var teams = await _context.UsersTeams
                .Include(ut => ut.Team)
                    .ThenInclude(t => t.UserTeams)
                        .ThenInclude(ut => ut.User)
                .Where(ut => ut.UserId == userId)
                .Select(ut => ut.Team)
                .ToListAsync();

            if (teams == null || !teams.Any())
            {
                return NotFound("No teams found for this user.");
            }

            var teamsDto = teams.Select(team => new TeamDto
            {
                Id = team.Id,
                Name = team.Name,
                Avatar = team.Avatar != null ? Convert.ToBase64String(team.Avatar) : null,
                TeamLeader = new UserInTeamGetDto
                {
                    Id = team.TeamLeader.Id,
                    Name = team.TeamLeader.Name,
                    Username = team.TeamLeader.Username,
                    Avatar = team.TeamLeader.Avatar != null ? Convert.ToBase64String(team.TeamLeader.Avatar) : null,
                    IsTeamLeader = true
                },
                Users = team.UserTeams.Select(ut => new UserInTeamGetDto
                {
                    Id = ut.User.Id,
                    Name = ut.User.Name,
                    Username = ut.User.Username,
                    Avatar = ut.User.Avatar != null ? Convert.ToBase64String(ut.User.Avatar) : null,
                    IsTeamLeader = ut.User.Id == team.TeamLeader.Id
                }).ToList()
            }).ToList();

            return Ok(teamsDto);
        }


        //[HttpPost]
        //public async Task<IActionResult> CreateTeam([FromForm] TeamCreatDto teamCreateDto)
        //{
        //    if (teamCreateDto == null)
        //    {
        //        ModelState.AddModelError("", "البيانات لا يمكن ان تكون فارغه");
        //        return BadRequest(ModelState);
        //    }

        //    try
        //    {
        //        User TeamLader = await _userRepository.GetUserAsync(teamCreateDto.TeamLeaderId);

        //        using var stream = new MemoryStream();
        //        await teamCreateDto.Avatar.CopyToAsync(stream);

        //        var fieldMapp = new Team
        //        {
        //            Name = teamCreateDto.Name,
        //            TeamLeader = TeamLader,
        //            Avatar = stream.ToArray(),
        //            UserTeams = teamCreateDto.UserIds.Select(userId => new UserTeam
        //            {
        //                UserId = userId,
        //                Team = new Team()
        //            }).ToList()
        //        };

        //        if (!_teamRepository.CreateTeam(fieldMapp))
        //        {
        //            ModelState.AddModelError("", "حدث خطأ اثناء حفظ البيانات");
        //            return BadRequest(ModelState);
        //        }

        //        return Ok("تم الحفظ بنجاح");
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error: {ex.Message}");
        //        return BadRequest(new { errors = ex.Message });
        //    }
        //}

        [HttpPost]
        public async Task<IActionResult> CreateTeam([FromForm] TeamCreatDto teamCreateDto)
        {
            if (teamCreateDto == null)
            {
                ModelState.AddModelError("", "البيانات لا يمكن ان تكون فارغه");
                return BadRequest(ModelState);
            }

            if (_teamRepository.TeamNameExist(teamCreateDto.Name))
            {
                return BadRequest(ModelState);
            }
                

            try
            {
                var teamLeader = await _userRepository.GetUserAsync(teamCreateDto.TeamLeaderId);

                using var stream = new MemoryStream();
                await teamCreateDto.Avatar.CopyToAsync(stream);

                var newTeam = new Team
                {
                    Name = teamCreateDto.Name,
                    TeamLeader = teamLeader,
                    Avatar = stream.ToArray(),
                    UserTeams = new List<UserTeam>()
                };

                foreach (var userId in teamCreateDto.UserIds)
                {
                    newTeam.UserTeams.Add(new UserTeam
                    {
                        UserId = userId,
                        Team = newTeam
                    });
                }

                if (!_teamRepository.CreateTeam(newTeam))
                {
                    ModelState.AddModelError("", "حدث خطأ اثناء حفظ البيانات");
                    return BadRequest(ModelState);
                }

                return Ok("تم الحفظ بنجاح");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return BadRequest(new { errors = ex.Message });
            }
        }



    }
}
