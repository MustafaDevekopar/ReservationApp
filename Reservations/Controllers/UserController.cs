using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Reservations.Dto;
using Reservations.Interfaces;
using Reservations.Repository;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = _mapper.Map<List<UserDto>>(await _userRepository.GetUsersAsync());

            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            return Ok(users);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
                return NotFound(ModelState);
            
            var user =_mapper.Map<UserDto>(await _userRepository.GetUserAsync(userId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }
        [HttpGet("{userId}/fields")]
        public async Task<IActionResult> GetUserOfField(int userId)
        {
            var fieldsOfuser = _mapper.Map<List<FootballFieldDto>>
                (_userRepository.GetFieldsOfUser(userId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(fieldsOfuser);
        }
    }
}
