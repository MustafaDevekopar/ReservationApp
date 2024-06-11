
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Reservations.Interfaces;
using Reservations.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace Reservations.Service
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<AppUser> _userManager;

        public TokenService(IConfiguration config, UserManager<AppUser> userManager)
        {
            _config = config;
            _userManager = userManager;
        }

        public async Task<string> CreateTokenAsync(AppUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = await _userManager.GetClaimsAsync(user);

            //claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.UserName));
            //claims.Add(new Claim(ClaimTypes.MobilePhone, user.PhoneNumber)); // إضافة رقم الهاتف إلى الـclaims

            var token = new JwtSecurityToken(
                issuer: _config["JWT:Issuer"],
                audience: _config["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}