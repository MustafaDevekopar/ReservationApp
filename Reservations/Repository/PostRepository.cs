using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Repository
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;
        public PostRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Post>> GetPostsAsync()
        {
            return await _context.Posts.ToListAsync();
        }

        public async Task<List<Post>> GetPostsOfFieldAsync(int fieldId)
        {
            return await _context.Posts.Where(p =>p.FootballField.Id == fieldId).ToListAsync();
        }

        public async Task<Post?> GetPostAsync(int id)
        {
            return await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
        }

        public bool PostExists(int postId)
        {
            return _context.Posts.Any(p => p.Id == postId);
        }

        public bool CreatePost(Post post)
        {
            _context.Posts.Add(post);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdatePost(Post post)
        {
            _context.Posts.Update(post);
            return Save();
        }

        public async Task<FootballField> GetFootballFieldOfPostAsync(int postid)
        {
            return await _context.Posts.Where(p => p.Id == postid)
                .Select(f => f.FootballField).FirstOrDefaultAsync();
        }

        public bool DeletePost(Post post)
        {
            _context.Posts.Remove(post);
            return Save();
        }
    }
}
