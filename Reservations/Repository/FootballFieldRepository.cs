using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Models;
using System.Collections;

namespace Reservations.Repository
{
    public class FootballFieldRepository : IFootballFieldRepository
    {
        private readonly DataContext _context;
        public FootballFieldRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<FootballField>> GetFootballFieldsAsync()
        {
            return await _context.FootballFields.ToListAsync();
        }

        public async Task<FootballField?> GetFootballFieldAsync(int id)
        {
            return await _context.FootballFields.FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task<FootballField> GetFootballFieldByNameAsync(string name)
        {
            return await _context.FootballFields.FirstOrDefaultAsync(c => c.Name == name);
        }
        public async Task<Category> GetCategoryOfFieldAsync(int fieldId)
        {
            return await _context.FootballFields.Where(c => c.Id == fieldId)
                .Select(c => c.Category).FirstOrDefaultAsync();
            
        }

        public async Task<Governorate> GetGovernorateOfFieldAsync(int fieldId)
        {
            return await _context.FootballFields.Where(c => c.Id == fieldId)
                .Select(c => c.Governorate).FirstOrDefaultAsync();
           
        }


        public bool FootballFieldExists(int FieldId)
        {
            return _context.FootballFields.Any(f => f.Id == FieldId);
        }

        public bool CreateFootballField(FootballField footballField)
        {
            _context.FootballFields.Add(footballField);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateFootBallField(FootballField footballField)
        {
            _context.FootballFields.Update(footballField);
            return Save();
        }

        public ICollection<User> GetUsersOfField(int fieldId)
        {
            return _context.UserFields.Where(f => f.FootballField.Id == fieldId)
      .Select(u => u.User).ToList();
        }
    }
}
