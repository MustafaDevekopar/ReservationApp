using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto;
using Reservations.Interfaces;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;
        public PostController(IPostRepository postRepository, IMapper mapper)
        {
            _postRepository = postRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var posts = _mapper.Map<List<PostDto>>(await _postRepository.GetPostsAsync());

            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            return Ok(posts);
        }


        [HttpGet("{postId}")]
        public async Task<IActionResult> GetById(int postId)
        {
            if (!_postRepository.PostExists(postId))
                return NotFound(ModelState);

            var post = _mapper.Map<PostDto>(await _postRepository.GetPostAsync(postId));

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(post);
        }

        [HttpGet("{fieldId}/postsfield")]
        public async Task<IActionResult> GetPostsByfaildId(int fieldId)
        {
            var post = _mapper.Map<List<PostDto>>(await _postRepository.GetPostsOfFieldAsync(fieldId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(post);
        }
    }
}
