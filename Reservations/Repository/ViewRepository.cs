using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Repository
{
    public class ViewRepository : IViewRepository
    {
        private readonly DataContext _context;
        public ViewRepository(DataContext context)
        {
            _context = context;
        }

        public decimal GetViewOfPostAsync(int postId)
        {
            return _context.Views.Where(v => v.Post.Id == postId).ToList().Count();
        }
    }
}
