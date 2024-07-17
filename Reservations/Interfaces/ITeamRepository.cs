using Microsoft.AspNetCore.Mvc;
using Reservations.Dto.Team;
using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface ITeamRepository
    {
        Task<Team?> GetTeamByIdAsync(int id);
        bool CreateTeam(Team team);
        bool Save();
        bool TeamExist(int id);
        bool TeamNameExist(string name);
    }
}
