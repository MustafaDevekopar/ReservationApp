using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reservations.Data;
using Reservations.Dto;
using Reservations.Dto.Admin;
using Reservations.Models;

namespace Reservations.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "FieldOwner")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserAdminController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public UserAdminController(
            UserManager<AppUser> userManager,
            IMapper mapper, 
            DataContext context)
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }

        // http get 
        //[Authorize(Policy = "MainAdminAdminFieldOwnerUser")]

        //[HttpGet("usersByType/{userType}")]
        //public async Task<IEnumerable<AppUser>> GetUsersByTypeAsync(string userType)
        //{
        //    // Get all users
        //    var users = await _userManager.Users.Where(a => a.AccountType == userType).ToListAsync();


        //    return users;
        //}

        [HttpGet("users")]
        public async Task<IActionResult> GetUsersAsync()
        {
            // Ensure the User navigation property is included
            var users = await _userManager.Users
                .Where(x => x.AccountType == "User")
                .Include(x => x.User).ToListAsync();

            var userDtos = users.Select(x => new UserAdminDto
            {
                Id = x.Id,
                UserName = x.UserName,
                PhoneNumber = x.PhoneNumber,
                AccountType = x.AccountType,
                UserGet = new UserGetDto
                {
                    Id = x.User.Id,
                    Name = x.User.Name,
                    Avatar = (x.User.Avatar != null) ? Convert.ToBase64String(x.User.Avatar) : null
                }
            }).ToList();

            return Ok(userDtos); // Return an OkObjectResult containing the userDtos
        }

        [HttpGet("footbalfields")]
        public async Task<IActionResult> GetFootbalfieldsAsync()
        {
            // Ensure the User navigation property is included
            var users = await _userManager.Users
                .Where(x => x.AccountType == "FieldOwner")
                .Include(x => x.FootballField).ToListAsync();

            var fieldMap = users.Select(x => new FieldAdminDto
            {
                Id = x.Id,
                UserName = x.UserName,
                PhoneNumber = x.PhoneNumber,
                AccountType = x.AccountType,
                FieldGet = new FootballFieldGetDto
                {
                    Id = x.FootballField.Id,
                    Name = x.FootballField.Name,
                    Location = x.FootballField.Location,
                    Avatar = (x.FootballField.Avatar != null) ? Convert.ToBase64String(x.FootballField.Avatar) : null
                }
            }).ToList();

            return Ok(fieldMap); // Return an OkObjectResult containing the userDtos
        }

        [HttpGet("usersByType/{userType}")]
        public async Task<IActionResult> GetUsersByTypeAsync(string userType)
        {
            // Get all users
            var users = _mapper.Map<List<UserAdminDto>>
                (await _userManager.Users.Where(a => a.AccountType == userType).ToListAsync());

            return Ok(users);
        }


    }
}
