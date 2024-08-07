﻿using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Reservations.Data;
using Reservations.Dto;
using Reservations.Dto.Admin;
using Reservations.Dto.CategoryDto;
using Reservations.Dto.FieldDto;
using Reservations.Dto.GovernorateDtos;
using Reservations.Dto.User;
using Reservations.Interfaces;
using Reservations.Models;
using Reservations.Repository;
using System.Security.Claims;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FootballFielController : ControllerBase
    {
        private readonly IFootballFieldRepository _footballFieldRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IGovernorateRepository _governorateRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;

        public FootballFielController(IFootballFieldRepository footballFieldRepository,
            ICategoryRepository categoryRepository,
            IGovernorateRepository governorateRepository,
            IMapper mapper, DataContext context, 
            UserManager<AppUser> userManager)
        {
            _footballFieldRepository = footballFieldRepository;
            _categoryRepository = categoryRepository;
            _governorateRepository = governorateRepository;
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GerFields()
        {
            // Ensure the User navigation property is included
            var users = await _userManager.Users
                .Where(x => x.AccountType == "FieldOwner")
                .Include(x => x.FootballField )
                .Include(x =>  x.FootballField.Governorate)
                .Include(x => x.FootballField.Category)
                .ToListAsync();
            var fieldMap = users.Select(x => new FieldUserAppGetDto
            {
                Id = x.Id,
                UserName = x.UserName,
                PhoneNumber = x.PhoneNumber,
                AccountType = x.AccountType,
                UserGet = new FieldGetDto
                {
                    Id = x.FootballField.Id,
                    Username = x.FootballField.Username,
                    Name = x.FootballField.Name,
                    Biography = x.FootballField.Biography,
                    CreatedAt = x.FootballField.CreatedAt,
                    Avatar = (x.FootballField.Avatar != null) ? Convert.ToBase64String(x.FootballField.Avatar) : null,
                    Latitude = x.FootballField.Latitude,
                    Longitude = x.FootballField.Longitude,
                    Location = x.FootballField.Location,
                    OpeningDays = (int)x.FootballField.OpeningDays,
                    OpeningHouer = x.FootballField.OpeningHouer,
                    GovernorateGet = new GovernorateDto
                    {
                        Id = x.FootballField.Governorate.Id,
                        Name = x.FootballField.Governorate.Name
                    },
                    CategoryGet = new CategoryGetDto
                    {
                        Id = x.FootballField.Category.Id,
                        Name = x.FootballField.Category.Name
                    }
                 
                }
            }).ToList();

            return Ok(fieldMap); // Return an OkObjectResult containing the userDtos
        }

        //=================================================================================
        [HttpGet("{FieldId}")]
        public async Task<IActionResult> GetField(int FieldId)
        {
            var user = await _userManager.Users
                .Where(x => x.FootballFieldId == FieldId)
                .Include(x => x.FootballField)
                .FirstOrDefaultAsync();

            if (user == null) return NotFound();

            var userDto = new FieldUserAppGetDto
            {
                Id = user.Id,
                UserName = user.UserName,
                PhoneNumber = user.PhoneNumber,
                AccountType = user.AccountType,
                UserGet = new FieldGetDto
                {
                    Id = user.FootballField.Id,
                    Username = user.FootballField.Username,
                    Name = user.FootballField.Name,
                    Biography = user.FootballField.Biography,
                    CreatedAt = user.FootballField.CreatedAt,
                    Avatar = (user.FootballField.Avatar != null) ? Convert.ToBase64String(user.FootballField.Avatar) : null,
                    Latitude = user.FootballField.Latitude,
                    Longitude = user.FootballField.Longitude,
                    Location = user.FootballField.Location,
                    OpeningDays = (int)user.FootballField.OpeningDays,
                    OpeningHouer = user.FootballField.OpeningHouer,
                }
            };

            return Ok(userDto);
        }

        [HttpGet("fieldIdByUsername/{username}")]
        public async Task<IActionResult> GetUserIdByUsername(string username)
        {
            if (!_footballFieldRepository.FieldExixtsUsername(username))
                return NotFound(ModelState);

            var fieldId = await _footballFieldRepository.GetFieldIdByUsername(username);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(fieldId);
        }


        [HttpGet("FieldByUsername/{username}")]
        public async Task<IActionResult> GetFieldByUsername(string username)
        {
            if (!_footballFieldRepository.FieldExixtsUsername(username))
                return NotFound(ModelState);
            var FieldId = await _footballFieldRepository.GetFieldIdByUsername(username);

            var user = await _userManager.Users
                .Where(x => x.FootballFieldId == FieldId)
                .Include(x => x.FootballField)
                .FirstOrDefaultAsync();

            if (user == null) return NotFound();

            var userDto = new FieldUserAppGetDto
            {
                Id = user.Id,
                UserName = user.UserName,
                PhoneNumber = user.PhoneNumber,
                AccountType = user.AccountType,
                UserGet = new FieldGetDto
                {
                    Id = user.FootballField.Id,
                    Username = user.FootballField.Username,
                    Name = user.FootballField.Name,
                    Biography = user.FootballField.Biography,
                    CreatedAt = user.FootballField.CreatedAt,
                    Avatar = (user.FootballField.Avatar != null) ? Convert.ToBase64String(user.FootballField.Avatar) : null,
                    Latitude = user.FootballField.Latitude,
                    Longitude = user.FootballField.Longitude,
                    Location = user.FootballField.Location,
                    OpeningDays = (int)user.FootballField.OpeningDays,
                    OpeningHouer = user.FootballField.OpeningHouer,
                }
            };

            return Ok(userDto);
        }


        [HttpGet("{fieldId}/Category")]
        public async Task<IActionResult> GetCategoryOfField(int fieldId)
        {
            var CategoryOfField =_mapper.Map<CategoryDto>
                ( await _footballFieldRepository.GetCategoryOfFieldAsync(fieldId));

            return Ok(CategoryOfField);
        }


        [HttpGet("{fieldId}/Governorate")]
        public async Task<IActionResult> GetCovrfField(int fieldId)
        {
            var GovernorateFoField = _mapper.Map<GovernorateDto>
                (await _footballFieldRepository.GetGovernorateOfFieldAsync(fieldId));

            return Ok(GovernorateFoField);
        }

        [HttpGet("{fieldId}/FollowedUsers")]
        public async Task<IActionResult> GetUserOfField(int fieldId)
        {
            var usersOfField = _mapper.Map<List<UserDto>>
                ( _footballFieldRepository.GetUsersOfField(fieldId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(usersOfField);
        }

        [HttpPost]
        public async Task<IActionResult> CreateFootballFaild([FromForm]FootballFieldCreateDto footballFieldCreate)
        {
            if (footballFieldCreate == null)
            {
                ModelState.AddModelError("", "FootballField connot by empty");
                return BadRequest(ModelState);
            }
            using var strem = new MemoryStream();
            await footballFieldCreate.Avatar.CopyToAsync(strem);

            var fieldMapp = new FootballField
            {
                Name = footballFieldCreate.Name,
                Username = footballFieldCreate.Username,
                //Password = footballFieldCreate.Password,
                //PhoneNumbr = footballFieldCreate.PhoneNumbr,
                Location = footballFieldCreate.Location,
                Avatar = strem.ToArray()
            };

            //var fieldMapp = _mapper.Map<FootballField>(footballFieldCreate);

            fieldMapp.Category = await _categoryRepository.GetCategoryAsync(footballFieldCreate.categoryId);
            fieldMapp.Governorate = await _governorateRepository.GetGovernorateAsync(footballFieldCreate.governorateId);

            if (!_footballFieldRepository.CreateFootballField(fieldMapp))
            {
                ModelState.AddModelError("", "Somthenk hapen whene saven");
                return BadRequest(ModelState);
            }

            return Ok("Successfully Created");
        }

        [HttpPut("{fieldId}")]
        public async Task<IActionResult>  UpdateFootballField(int fieldId,[FromForm]FootballfieldUpdateDto updateFootBallField)
        {
            if (updateFootBallField.Id  != fieldId)
            {
                ModelState.AddModelError("", "Field id in Url not equal faild id from form");
                return BadRequest(ModelState);
            }

            if (!_footballFieldRepository.FootballFieldExists(fieldId))
                return NotFound(ModelState);

            if (!ModelState.IsValid)
                return BadRequest();
            if (updateFootBallField == null)
            {
                ModelState.AddModelError("", "FootballField connot by empty");
                return BadRequest(ModelState);
            }
            using var strem = new MemoryStream();
            await updateFootBallField.Avatar.CopyToAsync(strem);

            var fieldMapp = new FootballField
            {
                Id =updateFootBallField.Id,
                Name = updateFootBallField.Name,
                Username = updateFootBallField.Username,
                Location = updateFootBallField.Location,
                Avatar = strem.ToArray()
            };

            fieldMapp.Category = await _categoryRepository.GetCategoryAsync(updateFootBallField.categoryId);
            fieldMapp.Governorate = await _governorateRepository.GetGovernorateAsync(updateFootBallField.governorateId);


            if (!_footballFieldRepository.UpdateFootBallField(fieldMapp))
            {
                ModelState.AddModelError("", "Somthing went woring while updating");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }



        // update User  

        [HttpPut("updateProfile/{fieldId}")]
        public async Task<IActionResult> UpdateUser(int fieldId, [FromForm] UpdateUserNameDto updateUserDto)
        {

            var field = await _footballFieldRepository.GetFootballFieldAsync(fieldId);

            if (field == null)
            {
                return NotFound("User not found");
            }

            // Find the AppUser associated with the User
            var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.FootballFieldId == fieldId);

            if (appUser == null)
            {
                return NotFound("AppUser not found");
            }

            // Update UserName in AppUser table
            appUser.UserName = updateUserDto.UserName;

            // Update Username in User table
            field.Username = updateUserDto.UserName;
            field.Name = updateUserDto.Name;
            field.Biography = updateUserDto.Biography;
            //_context.Users.Update(user);


            // Save changes in the database
            var result = await _userManager.UpdateAsync(appUser);

            if (result.Succeeded)
            {
                //await _context.SaveChangesAsync();
                if (!_footballFieldRepository.UpdateFootBallField(field))
                {
                    ModelState.AddModelError("", "Something went wrong while updating the avatar");
                    return BadRequest(ModelState);
                }
                return Ok("User updated successfully");
            }
            else
            {
                return BadRequest("Failed to update user");
            }
        }

        // ==== update location ======================


        [HttpPut("updateLocation/{fieldId}")]
        public async Task<IActionResult> UpdateUser(int fieldId, [FromForm] LocationDto updateUserDto)
        {

            var field = await _footballFieldRepository.GetFootballFieldAsync(fieldId);

            if (field == null)
            {
                return NotFound("User not found");
            }

            // Find the AppUser associated with the User
            var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.FootballFieldId == fieldId);

            if (appUser == null)
            {
                return NotFound("AppUser not found");
            }

            // Update Username in User table
            field.Latitude = updateUserDto.Latitude;
            field.Longitude = updateUserDto.Longitude;

            // Save changes in the database
            var result = await _userManager.UpdateAsync(appUser);

            //await _context.SaveChangesAsync();
            if (!_footballFieldRepository.UpdateFootBallField(field))
            {
                ModelState.AddModelError("", "Something went wrong while updating the avatar");
                return BadRequest(ModelState);
            }
            return Ok("Field Location updated successfully");

        }
        // ============== update avatar ==============
        [HttpPut("updateFieldAvatar/{fieldId}")]
        public async Task<IActionResult> UpdateAvatar(int fieldId, [FromForm] UserAvatarUpdateDto avatarUpdateDto)
        {
            if (avatarUpdateDto?.Avatar == null)
            {
                ModelState.AddModelError("", "Avatar file is required");
                return BadRequest(ModelState);
            }

            var field = await _footballFieldRepository.GetFootballFieldAsync(fieldId);
            if (field == null)
            {
                return NotFound("User not found");
            }

            using var memoryStream = new MemoryStream();
            await avatarUpdateDto.Avatar.CopyToAsync(memoryStream);
            field.Avatar = memoryStream.ToArray();

            if (!_footballFieldRepository.UpdateFootBallField(field))
            {
                ModelState.AddModelError("", "Something went wrong while updating the avatar");
                return BadRequest(ModelState);
            }

            return Ok("Avatar updated successfully");
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "FieldOwner")]
        [HttpPut("UpdateHours")]
        public async Task<IActionResult> SaveHours([FromBody] SaveHoursDto dto)
        {
            var phoneClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.MobilePhone);
            if (phoneClaim == null)
            {
                return Unauthorized("التوكن غير صالح أو مفقود.");
            }

            var phoneNumber = phoneClaim.Value;
            // Get user from token information
            var user = await _userManager.Users.Include(u => u.FootballField)
                                           .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
            if (user == null)
            {
                return NotFound("المستخدم غير موجود.");
            }

            var field_id = user.FootballField.Id;
            if (field_id == null)
            {
                return NotFound("المستخدم غير موجود.");
            }

            if (field_id != dto.FieldId)
            {
                return Unauthorized("لا تملك صلاحية الوصول!!");
            }
            var footballField = await _context.FootballFields.FindAsync(dto.FieldId);

            if (footballField == null)
                return NotFound("Field not found");

            footballField.OpeningHouer = JsonConvert.SerializeObject(dto.OpeningHours);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}

