using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)

        {

           //checking if we have any users in database
           if(!userManager.Users.Any())
           {
               var user = new User
               {
                   UserName = "ivan",
                   Email  = "ivan2102@gmail.com"
               };

              await userManager.CreateAsync(user, "Pa$$w0rd");
              await  userManager.AddToRoleAsync(user, "Member");


              var admin = new User
              {
                  UserName = "admin",
                  Email = "admin@gmail.com"
              };

              await userManager.CreateAsync(admin, "Pa$$w0rd");
              await userManager.AddToRolesAsync(admin, new[] {"Member","Admin"});
           }

            if(context.Products.Any()) return;

            var products = new List<Product>

          {
              	new Product
                {
                    Name = "Man Shoes",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 20000,
                    PictureUrl = "/images/products/men-shoes-1.jpg",
                    Brand = "Shoes",
                    Type = "Man",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sneakers",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 15000,
                    PictureUrl = "/images/products/sneakers-1.jpg",
                    Brand = "Nike",
                    Type = "Man",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sneakers",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureUrl = "/images/products/sneakers-2.jpg",
                    Brand = "Nike",
                    Type = "Man",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sneakers",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    PictureUrl = "/images/products/sneakers-3.jpg",
                    Brand = "Nike",
                    Type = "Man",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sneakers",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 25000,
                    PictureUrl = "/images/products/sneakers-4.avif",
                    Brand = "Adidas",
                    Type = "Man",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sneakers",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 12000,
                    PictureUrl = "/images/products/sneakers-5.avif",
                    Brand = "Adidas",
                    Type = "Women",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Women Shoes",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1000,
                    PictureUrl = "/images/products/women-shoes-1.avif",
                    Brand = "Puma",
                    Type = "Women",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Women Shoes",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 8000,
                    PictureUrl = "/images/products/women-shoes-2.avif",
                    Brand = "Clarks",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sneakers",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/sneakers-6.avif",
                    Brand = "Connor",
                    Type = "Women",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sneakers",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1800,
                    PictureUrl = "/images/products/sneakers-7.avif",
                    Brand = "Asics",
                    Type = "Man",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "High Heels",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/women-shoes-3.webp",
                    Brand = "Naturalizer",
                    Type = "Women",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "High Heels",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1600,
                    PictureUrl = "/images/products/women-shoes-4.webp",
                    Brand = "Clarks",
                    Type = "Women",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sneakers",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1400,
                    PictureUrl = "/images/products/sneakers-8.avif",
                    Brand = "Convers",
                    Type = "Man",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sneakers",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 25000,
                    PictureUrl = "/images/products/sneakers-9.avif",
                    Brand = "Asics",
                    Type = "Women",
                    QuantityInStock = 100
                },
               
                
          };

          foreach (var product in products)
          {
              context.Products.Add(product);
          }

          context.SaveChanges();
        }
    }
}