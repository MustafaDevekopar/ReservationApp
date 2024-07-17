using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Dto.Team;
using Reservations.Dto.User;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Repository
{
    
    public class TeamRepository : ITeamRepository
    {
        private readonly DataContext _context;
        public TeamRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Team?> GetTeamByIdAsync(int id)
        {
            return await _context.Teams.FirstOrDefaultAsync(t => t.Id == id);
        }

        public bool CreateTeam(Team team)
        {
            _context.Teams.Add(team);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool TeamExist(int id)
        {
            return _context.Teams.Any(t => t.Id == id);
        }

        public bool TeamNameExist(string name)
        {
            return _context.Teams.Any(t => t.Name == name);
        }
    }
}
