using Reservations.Models;

namespace Reservations.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetCategoriesAsync();
        Task<Category?> GetCategoryAsync(int id);
        Task<Category> GetCategoryByNameAsync(string name);
        bool CategoriesExists(int categoryId);
        bool CreateCategory(Category category);
        bool UpdateCategory(Category category);
        bool Save();

    }
}
