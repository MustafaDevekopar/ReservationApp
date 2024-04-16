using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _context;
        public CategoryRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Category>> GetCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category?> GetCategoryAsync(int id)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Category> GetCategoryByNameAsync(string name)
        {
            return await _context.Categories.Where(n => n.Name == name).FirstOrDefaultAsync();
        }

        public bool CategoriesExists(int categoryId)
        {
            return _context.Categories.Any(c => c.Id == categoryId);
        }

        public bool CreateCategory(Category category)
        {
            _context.Categories.Add(category);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateCategory(Category category)
        {
            _context.Categories.Update(category);
            return Save();
        }

    }
}
