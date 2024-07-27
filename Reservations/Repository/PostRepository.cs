using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Reservations.Data;
using Reservations.Dto;
using Reservations.Dto.Post;
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
        public async Task<List<PostWithFieldGetDto>> GetPostsAsync()
        {
            var posts = await _context.Posts
                     .Include(c => c.FootballField)
                     .ToListAsync();

            return posts.Select(c => new PostWithFieldGetDto
            {
                Id = c.Id,
                Title = c.Title,
                Text = c.Text,
                Image = (c.Image != null) ? Convert.ToBase64String(c.Image) : null,
                Field = new FieldOfPostDto
                {
                    Id = c.FootballField.Id,
                    Name = c.FootballField.Name,
                    Username = c.FootballField.Username,
                    Avatar = (c.FootballField.Avatar != null) ? Convert.ToBase64String(c.FootballField.Avatar) : null,
                    // Map other user properties as needed
                }
            }).ToList();

        }

        //public async Task<List<Post>> GetPostsOfFieldAsync(int fieldId)
        //{
        //    return await _context.Posts.Where(p =>p.FootballField.Id == fieldId).ToListAsync();
        //}


        async Task<List<PostWithFieldGetDto>> IPostRepository.GetPostsOfFieldAsync(int fieldId)
        {
            
            var posts = await _context.Posts
                  .Include(c => c.FootballField)
                  .Where(c => c.FootballField.Id == fieldId)
                  .ToListAsync();

            return posts.Select(c => new PostWithFieldGetDto
            {
                Id = c.Id,
                Title = c.Title,
                Text = c.Text,
                Image = (c.Image != null) ? Convert.ToBase64String(c.Image) : null,
                Field = new FieldOfPostDto
                {
                    Id = c.FootballField.Id,
                    Name = c.FootballField.Name,
                    Username = c.FootballField.Username,
                    Avatar = (c.FootballField.Avatar != null) ? Convert.ToBase64String(c.FootballField.Avatar) : null,
                    // Map other user properties as needed
                }
            }).ToList();

            //return posts;
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
