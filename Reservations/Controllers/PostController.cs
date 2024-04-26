using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Reservations.Dto;
using Reservations.Interfaces;
using Reservations.Models;
using Reservations.Repository;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IFootballFieldRepository _footballFieldRepository;
        private readonly IMapper _mapper;
        public PostController(IPostRepository postRepository,
            IFootballFieldRepository footballFieldRepository,
            IMapper mapper)
        {
            _postRepository = postRepository;
            _footballFieldRepository = footballFieldRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var posts = await _postRepository.GetPostsAsync();
            var postMap = posts.Select(post =>
            {
                string avatarBase64 = post.Image != null ? Convert.ToBase64String(post.Image) : null;
                return new PostGetDto
                {
                    Id = post.Id,
                    Title = post.Title,
                    Text = post.Text,
                    Image = avatarBase64
                };
            }).ToList();

            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            return Ok(postMap);
        }


        [HttpGet("{postId}")]
        public async Task<IActionResult> GetById(int postId)
        {
            if (!_postRepository.PostExists(postId))
                return NotFound(ModelState);

            var post = await _postRepository.GetPostAsync(postId);

            string avatarBase64 = post.Image != null ? Convert.ToBase64String(post.Image) : null;

            var postMap = new PostGetDto
            {
                Title = post.Title,
                Text = post.Text,
                Image = avatarBase64
            };


            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(postMap);
        }

        [HttpGet("fieldOfpost/{postId}")]
        public async Task<IActionResult> GetFieldOfPost(int postId)
        {
            if (!_postRepository.PostExists(postId))
                return NotFound(ModelState);

            var fieldOfPost = _mapper.Map<FootballFieldDto>(await _postRepository.GetFootballFieldOfPostAsync(postId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(fieldOfPost);
        }

        [HttpGet("{fieldId}/postsfield")]
        public async Task<IActionResult> GetPostsByfaildId(int fieldId)
        {
            var posts = await _postRepository.GetPostsOfFieldAsync(fieldId);

            var postMap = posts.Select(post =>
            {
                string avatarBase64 = post.Image != null ? Convert.ToBase64String(post.Image) : null;
                return new PostGetDto
                {
                    Title = post.Title,
                    Text = post.Text,
                    Image = avatarBase64
                };
            }).ToList();


            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(postMap);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromQuery]int fieldId ,[FromForm]PostDto postCreate)
        {
            if(postCreate == null)
            {
                ModelState.AddModelError("", "Post connt be empty");
                return BadRequest(ModelState);
            }

            using var strem = new MemoryStream();
            await postCreate.Image.CopyToAsync(strem);

            var postMap = new Post
            {
                Title = postCreate.Title,
                Text = postCreate.Text,
                Image = strem.ToArray()
            };

            postMap.FootballField = await _footballFieldRepository.GetFootballFieldAsync(fieldId);
            if(!_postRepository.CreatePost(postMap))
            {
                ModelState.AddModelError("", "Somthenk hapen when saven");
                return BadRequest(ModelState);
            }

            return Ok("Successfully Created");

        }

        [HttpPut("update/{postId}")]
        public async Task<IActionResult> UpdatePost(int postId, [FromForm]PostDto updatePost)
        {
            if (updatePost == null)
                return BadRequest();

            if (postId != updatePost.Id)
                return BadRequest(ModelState);

            if (!_postRepository.PostExists(postId))
                return NotFound(ModelState);

            if (!ModelState.IsValid)
                return BadRequest();

            using var strem = new MemoryStream();
            await updatePost.Image.CopyToAsync(strem);

            var postMap = new Post
            {
                Id = (int)updatePost.Id,
                Title = updatePost.Title,
                Text = updatePost.Text,
                Image = strem.ToArray()
            };

            //var postMap = _mapper.Map<Post>(updatePost);
            postMap.FootballField = await _postRepository.GetFootballFieldOfPostAsync(postId);

            if (!_postRepository.UpdatePost(postMap))
            {
                ModelState.AddModelError("", "Somthing went woring while updating");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }


        [HttpDelete("{postId}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            if (!_postRepository.PostExists(postId))
                return NotFound();

            var postToDelete = await _postRepository.GetPostAsync(postId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_postRepository.DeletePost(postToDelete))
                ModelState.AddModelError("", "Something went wring deleting");

            return NoContent();

        }
    }
}
