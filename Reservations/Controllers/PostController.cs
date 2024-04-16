using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto;
using Reservations.Interfaces;
using Reservations.Models;

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

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromQuery]int fieldId ,[FromBody] PostDto postCreate)
        {
            if(postCreate == null)
            {
                ModelState.AddModelError("", "Post connt be empty");
                return BadRequest(ModelState);
            }

            var postMap = _mapper.Map<Post>(postCreate);
            postMap.FootballField =await _footballFieldRepository.GetFootballFieldAsync(fieldId);
            if(!_postRepository.CreatePost(postMap))
            {
                ModelState.AddModelError("", "Somthenk hapen when saven");
                return BadRequest(ModelState);
            }

            return Ok("Successfully Created");

        }
    }
}
