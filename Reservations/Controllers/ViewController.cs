using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Dto;
using Reservations.Interfaces;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViewController : ControllerBase
    {
        private readonly IViewRepository _viewRepository;
        private readonly IMapper _mapper;
        public ViewController(IViewRepository viewRepository, IMapper mapper)
        {
            _mapper = mapper;
            _viewRepository = viewRepository;
        }

        [HttpGet("{postId}")]
        public async Task<IActionResult> GetViewsOfPost(int postId)
        {
            var numberOfviews =  _viewRepository.GetViewOfPostAsync(postId);

            if (!ModelState.IsValid) 
                return BadRequest(ModelState);
            return Ok(numberOfviews);
        }
    }
}
