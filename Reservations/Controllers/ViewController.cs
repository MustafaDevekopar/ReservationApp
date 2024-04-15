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
    public class ViewController : ControllerBase
    {
        private readonly IViewRepository _viewRepository;
        private readonly IUserRepository _userRepository;
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;
        public ViewController(IViewRepository viewRepository,
            IUserRepository userRepository,
            IPostRepository postRepository,
            IMapper mapper)
        {
            _viewRepository = viewRepository;
            _userRepository = userRepository;
            _postRepository = postRepository;
            _mapper = mapper;
        }

        [HttpGet("{postId}")]
        public async Task<IActionResult> GetViewsOfPost(int postId)
        {
            var numberOfviews =  _viewRepository.GetViewOfPostAsync(postId);

            if (!ModelState.IsValid) 
                return BadRequest(ModelState);
            return Ok(numberOfviews);
        }

        [HttpPost]
        public async Task<IActionResult> CreateView([FromBody]ViewDto viewCreate, 
            [FromQuery]int userId, 
            [FromQuery]int postId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var viewMap = _mapper.Map<View>(viewCreate);

            viewMap.Post = await _postRepository.GetPostAsync(postId);
            viewMap.User = await _userRepository.GetUserAsync(userId);

            if (!_viewRepository.CreateView(viewMap))
            {
                ModelState.AddModelError("", "Something woring while savin");
                return BadRequest(ModelState);
            }
            return Ok("Successfully Created");
        }
    }
}
