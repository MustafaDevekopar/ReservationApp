using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto;
using Reservations.Interfaces;
using Reservations.Models;
using System.Security.Claims;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IFootballFieldRepository _footballFieldRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public PostController(IPostRepository postRepository,
            IFootballFieldRepository footballFieldRepository,
            IMapper mapper,
            UserManager<AppUser> userManager)
        {
            _postRepository = postRepository;
            _footballFieldRepository = footballFieldRepository;
            _mapper = mapper;
            _userManager = userManager;

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var posts = await _postRepository.GetPostsAsync();

            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            return Ok(posts);
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
                Id = post.Id,
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

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "FieldOwner")]
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromForm] PostDto postCreate)
        {
            if (postCreate == null)
            {
                ModelState.AddModelError("", "لا يمكن ان تكون البيانات فارغة");
                return BadRequest(ModelState);
            }

            var emailClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
            if (emailClaim == null)
            {
                return Unauthorized("التوكن غير صالح أو مفقود.");
            }

            var email = emailClaim.Value;
            //get user from token informations  
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return Unauthorized("لا تملك صلاحية القيام بهذا الاجراء!!");
            }

            var field = await _footballFieldRepository.GetFootballFieldAsync(user.FootballFieldId.Value);
            if (field == null)
            {
                return NotFound("ملعب كرة القدم غير موجود.");
            }

            using var stream = new MemoryStream();
            await postCreate.Image.CopyToAsync(stream);

            var postMap = new Post
            {
                Title = postCreate.Title,
                Text = postCreate.Text,
                Image = stream.ToArray(),
                FootballField = field
            };

            if (!_postRepository.CreatePost(postMap))
            {
                ModelState.AddModelError("", "حدث خطأ أثناء اضافة المنشور.");
                return BadRequest(ModelState);
            }

            return Ok("تم الإنشاء بنجاح");
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
