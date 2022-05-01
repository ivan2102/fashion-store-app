using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace API.Extensions
{
    public static class CartExtensions
    {
        public static CartDto MapCartToDto(this Cart cart)
        {
             return new CartDto
            {
                Id = cart.Id,
                BuyerId = cart.BuyerId,
                PaymentIntentId = cart.PaymentIntentId,
                ClientSecret = cart.ClientSecret,
                Items = cart.Items.Select(item => new CartItemDto {

                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

       //return cart for orders
       public static IQueryable<Cart> ReturnCartWithItems(this IQueryable<Cart> query, string buyerId)
       {
           return query.Include(item => item.Items).ThenInclude(product => product.Product).Where(cart => cart.BuyerId == buyerId);
       }

    }
}