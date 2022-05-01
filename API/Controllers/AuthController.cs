using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Controllers
{
    public  class AuthController : BaseApiController
    {

        private readonly UserManager<User> _userManager;

        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
      

        public AuthController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
            _userManager = userManager;
            _tokenService = tokenService;
            
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);

            if(user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            return Unauthorized();

            var userCart = await ReturnCart(loginDto.Username);

            var anonCart = await ReturnCart(Request.Cookies["buyerId"]);

            if(anonCart != null)
            {
                if(userCart != null) _context.Carts.Remove(userCart);
                anonCart.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                object value = await _context.SaveChangesAsync();
            }

            return  new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Cart = (CartDto)(anonCart != null ? anonCart.MapCartToDto() : userCart?.MapCartToDto())
            };
        }

        [HttpPost("register")]

        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User{UserName = registerDto.Username, Email = registerDto.Email};

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
           var user = await _userManager.FindByNameAsync(User.Identity.Name);

           var userCart = await ReturnCart(User.Identity.Name);

           return new UserDto
           {
               Email = user.Email,
               Token = await _tokenService.GenerateToken(user),
               Cart = userCart?.MapCartToDto()
           };
        }

        [Authorize]
        [HttpGet("savedAddress")]

        public async Task<ActionResult<UserAddress>> GetSavedAddress()
        {
            return await _userManager.Users
            .Where(item => item.UserName == User.Identity.Name)
            .Select(user => user.Address)
            .FirstOrDefaultAsync();
        }

           private async Task<Cart> ReturnCart(string buyerId)
        {
             if(string.IsNullOrEmpty(buyerId))
             {
                 Response.Cookies.Delete("buyerId");
                 return null;
             }

            return await _context.Carts

            .Include(item => item.Items)
            .ThenInclude(product => product.Product)
            .FirstOrDefaultAsync(item => item.BuyerId == buyerId);
        }
    }
}