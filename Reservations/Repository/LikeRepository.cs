using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Repository
{
    public class LikeRepository : ILikeRepository
    {
        private readonly DataContext _context;
        public LikeRepository(DataContext context)
        {
            _context = context;
        }

        public decimal GetLikesOfPostAsync(int postId)
        {
            return _context.Likes.Where(l => l.Post.Id == postId).ToList().Count();
        }

        public bool CreateLike(Like like)
        {
            _context.Likes.Add(like);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
