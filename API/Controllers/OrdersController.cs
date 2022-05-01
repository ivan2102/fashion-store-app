using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.Order;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [Authorize]
    
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet]

        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
           return await _context.Orders
           .ProjectOrderToOrderDto()
           .Where(item => item.BuyerId == User.Identity.Name)
           .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]

        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await _context.Orders
            .ProjectOrderToOrderDto()
            .Where(item => item.BuyerId == User.Identity.Name && item.Id == id)
            .FirstOrDefaultAsync();
        }

        //Create order
        [HttpPost]

        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
        {
           var cart = await _context.Carts
           .ReturnCartWithItems(User.Identity.Name)
           .FirstOrDefaultAsync();

           if(cart == null) return BadRequest(new ProblemDetails{Title = "Your cart is empty"});

           var items = new List<OrderItem>();

           foreach (var item in cart.Items)
           {
               var productItem = await _context.Products.FindAsync(item.ProductId);

               var itemOrdered = new ProductItemOrdered
               {
                   ProductId = productItem.Id,
                   Name = productItem.Name,
                   PictureUrl = productItem.PictureUrl
               };

               var orderItem = new OrderItem
               {
                   ItemOrdered = itemOrdered,
                   Price = productItem.Price,
                   Quantity = item.Quantity
               };

               items.Add(orderItem);

               productItem.QuantityInStock -= item.Quantity;
           }

           //price
           var subtotal = items.Sum(item => item.Price * item.Quantity);
           var tax = (0.15 * subtotal);

           var order = new Order
           {
               OrderItems = items,
               BuyerId = User.Identity.Name,
               ShippingAddress = orderDto.ShippingAddress,
               Subtotal = subtotal,
               Tax = (long)tax,
               PaymentIntentId = cart.PaymentIntentId
           };


           //tracking the order
           _context.Orders.Add(order);
           _context.Carts.Remove(cart);

           if(orderDto.SaveAddress)
           {
               var user = await _context.Users
               .Include(address => address.Address)
               .FirstOrDefaultAsync(item => item.UserName == User.Identity.Name);

                var address = new UserAddress
                {
                    FullName = orderDto.ShippingAddress.FullName,
                    Address1 = orderDto.ShippingAddress.Address1,
                    Address2 = orderDto.ShippingAddress.Address2,
                    City = orderDto.ShippingAddress.City,
                    State = orderDto.ShippingAddress.State,
                    ZipCode = orderDto.ShippingAddress.ZipCode,
                    Country = orderDto.ShippingAddress.Country
                };
                user.Address = address;
                //_context.Update(user);

           }

           var result = await _context.SaveChangesAsync() > 0;
           
           if(result) return CreatedAtRoute("GetOrder", new {id = order.Id}, order.Id);

           return BadRequest("Something went wrong");
    }

        
    }

}