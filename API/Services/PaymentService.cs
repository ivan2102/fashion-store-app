using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.RequestHelpers;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace API.Services
{
    public class PaymentService
    {
        private readonly IConfiguration config;
        private readonly IConfiguration _config;

        public PaymentService(IConfiguration config)
        {
            _config = config;
            
        }

  

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Cart cart)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var service = new PaymentIntentService();

            var intent = new PaymentIntent();

            var subtotal = cart.Items.Sum(item => item.Quantity * item.Product.Price);
            var tax = 0.15 * subtotal;

            if(string.IsNullOrEmpty(cart.PaymentIntentId))
            {
               var options = new PaymentIntentCreateOptions
               {
                   Amount = (long?)(subtotal + tax),
                   Currency = "usd",
                   PaymentMethodTypes = new List<string> {"card"}

               }; 

               intent = await service.CreateAsync(options);
               
            }
            else 
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long?)(subtotal + tax)
                };

                await service.UpdateAsync(cart.PaymentIntentId, options);
            }

            return intent;
        }
    }
}