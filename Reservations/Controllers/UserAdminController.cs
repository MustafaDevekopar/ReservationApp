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
using Reservations.Dto.FieldDto;
using Reservations.Dto.User;
using Reservations.Interfaces;
using Reservations.Models;
using Reservations.Repository;

namespace Reservations.Controllers
{
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "MainAdminAdmin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserAdminController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        public UserAdminController(
            UserManager<AppUser> userManager,
            IMapper mapper, 
            DataContext context,
            IUserRepository userRepository

            )
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
            _userRepository = userRepository;

        }

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
                    Username = x.User.Username,
                    Name = x.User.Name,
                    Biography = x.User.Biography,
                    CreatedAt = x.User.CreatedAt,
                    Avatar = (x.User.Avatar != null) ? Convert.ToBase64String(x.User.Avatar) : null
                }
            }).ToList();

            return Ok(userDtos); // Return an OkObjectResult containing the userDtos
        }
        //============ get Admin and main admin ================
        [HttpGet("Admins")]
        public async Task<IActionResult> GetAdminAsync()
        {
            // Ensure the User navigation property is included
            var users = await _userManager.Users
                .Where(x =>( x.AccountType == "MainAdmin" ||  x.AccountType == "Admin"))
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
                    Username = x.User.Username,
                    Name = x.User.Name,
                    Biography = x.User.Biography,
                    CreatedAt = x.User.CreatedAt,
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
                    Username = x.FootballField.Username,
                    Name = x.FootballField.Name,
                    CreatedAt = x.FootballField.CreatedAt,
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


        [HttpPut("updateUser/{userId}")]
        public async Task<IActionResult> UpdateUser(int userId, [FromBody] UpdateUserNameDto updateUserDto)
        {
            // Find the User by userId
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Find the AppUser associated with the User
            var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.UserId == userId);

            if (appUser == null)
            {
                return NotFound("AppUser not found");
            }

            // Update UserName in AppUser table
            appUser.UserName = updateUserDto.UserName;

            // Update Username in User table
            user.Username = updateUserDto.UserName;
            _context.Users.Update(user);

            // Save changes in the database
            var result = await _userManager.UpdateAsync(appUser);

            if (result.Succeeded)
            {
                await _context.SaveChangesAsync();
                return Ok("تم التحديث بنجاح");
            }
             
                return BadRequest("فشل !!");
        }
        ///=============== dlelte =========== <summary>
      

        [HttpDelete("Delete/{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            // if(_userRepository.UserExists(userId))
            //     return NotFound("المستخدم غير موجود");


            // var user = await _userRepository.GetUserAsync(userId);
            // if (user == null)
            //     return NotFound("User not found");

            //if(! _userRepository.DeleteUser(user))
            //     ModelState.AddModelError("", "Something went wring deleting");

            // // Find the AppUser associated with the User
            // var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.UserId == userId);

            // if (appUser == null)
            //     return NotFound("AppUser not found");


            return Ok();


        }
    }
}
