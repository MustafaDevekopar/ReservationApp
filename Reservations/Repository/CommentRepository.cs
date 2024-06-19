using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Dto;
using Reservations.Dto.Comment;
using Reservations.Dto.User;
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

        public async Task<List<CommentsWithUser>> GetCommentsOfPostAsync(int postId)
        {
            var comments = await _context.Comments
                .Where(c => c.Post.Id == postId)
                .Include(c => c.User)
                .ToListAsync();

            return comments.Select(c => new CommentsWithUser
            {
                Id = c.Id,
                Text = c.Text,
                DateTime = c.DateTime,
                User = new UserToCommentDto
                {
                    Id = c.User.Id,
                    Name = c.User.Name,
                    Username = c.User.Username,
                    Avatar = (c.User.Avatar != null) ? Convert.ToBase64String(c.User.Avatar) : null,
                    // Map other user properties as needed
                }
            }).ToList();
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
