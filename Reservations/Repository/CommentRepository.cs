using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Interfaces;
using Reservations.Models;

namespace Reservations.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly DataContext _context;
        public CommentRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Comment>> GetCommentsAsync()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task<Comment?> GetCommentAsync(int id)
        {
            return await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<List<Comment>> GetCommentsOfPostAsync(int fieldId)
        {
            return await _context.Comments.Where(c => c.Post.Id == fieldId).ToListAsync();
        }

        public bool CommentExists(int commentId)
        {
            return _context.Comments.Any(c => c.Id == commentId);
        }

        public bool CreateComment(Comment comment)
        {
            _context.Comments.Add(comment);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool DeleteComment(Comment comment)
        {
            _context.Comments.Remove(comment);
            return Save();
        }
    }
}
