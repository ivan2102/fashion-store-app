using System;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly StoreContext _context;

        public CartController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet(Name = "GetCart")]

        public async Task<ActionResult<CartDto>> GetCart()
        {
            var cart = await ReturnCart(GetBuyerId());

            if (cart == null) return NotFound();

            return cart.MapCartToDto();
        }

    

        [HttpPost]

        public async Task<ActionResult<CartDto>> AddItemToCart(int productId, int quantity)
        {
            //get cart || create cart
            var cart = await ReturnCart(GetBuyerId());

           //create cart
            if(cart == null) cart = CreateCart();
            //get product
            var product = await _context.Products.FindAsync(productId);
            if(product == null) return BadRequest(new ProblemDetails{Title = "Product Not Found"});
            //add item
            cart.AddItem(product, quantity);
            //save changes
            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetCart", cart.MapCartToDto());

            return BadRequest(new ProblemDetails{Title = "Problem saving your item to the cart"});

            
        }



       

        [HttpDelete]

        public async Task<ActionResult> RemoveCartItem(int productId, int quantity) 
        {
            //get basket
            var cart = await ReturnCart(GetBuyerId());
            if(cart == null) return NotFound();
            //remove item or reduce quantity
            cart.RemoveItem(productId, quantity);
            //save changes
            var result = await _context.SaveChangesAsync() > 0;
           if(result) return Ok();

           return BadRequest(new ProblemDetails{Title = "Problem removing item from the basket"});
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

        //buyerId
        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

         private Cart CreateCart()
        {
            var buyerId = User.Identity?.Name;

            if(string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();

                var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};

                Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            }

            
            var cart = new Cart{BuyerId = buyerId};

            _context.Carts.Add(cart);

            return cart;
        }
        
    }
}