using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto;
using Reservations.Interfaces;
using Reservations.Models;
using Reservations.Repository;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly ILikeRepository _likeRepository;
        private readonly IPostRepository _postRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public LikeController(ILikeRepository likeRepository,
            IPostRepository postRepository,
            IUserRepository userRepository,
            IMapper mapper)
        {
            _likeRepository = likeRepository;
            _postRepository = postRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet("{postId}/likesPost")]
        public async Task<IActionResult> GetLikesOfPost(int postId)
        {
            var likesOfPost = _likeRepository.GetLikesOfPostAsync(postId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(likesOfPost);
        }

        [HttpGet("{likeId}")]
        public async Task<IActionResult> GetById(int likeId)
        {
            if (!_likeRepository.LikeExists(likeId))
                return NotFound(ModelState);

            var like = _mapper.Map<LikeDto>(await _likeRepository.GetLikeAsync(likeId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(like);
        }

        [HttpPost]
        public async Task<IActionResult> CreateLike([FromBody] LikeDto likeCreate,
            [FromQuery] int userId,
            [FromQuery] int postId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var likeMap = _mapper.Map<Like>(likeCreate);

            likeMap.Post = await _postRepository.GetPostAsync(postId);
            likeMap.User = await _userRepository.GetUserAsync(userId);

            if (!_likeRepository.CreateLike(likeMap))
            {
                ModelState.AddModelError("", "Something woring while savin");
                return BadRequest(ModelState);
            }
            return Ok("Successfully Created");
        }

        [HttpDelete("{likeId}")]
        public async Task<IActionResult> DeleteLike(int likeId)
        {
            if (!_likeRepository.LikeExists(likeId))
                return NotFound();

            var likeToDelete = await _likeRepository.GetLikeAsync(likeId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_likeRepository.DeleteLike(likeToDelete))
                ModelState.AddModelError("", "Something went wring deleting");

            return NoContent();

        }
    }
}
