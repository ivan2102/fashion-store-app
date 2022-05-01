using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.Order
{
    public class Order
    {
        public int Id {get; set;}
        public string BuyerId {get; set;}
        public ShippingAddress ShippingAddress {get; set;}
        public DateTime OrderDate {get; set;} = DateTime.Now;
        public List<OrderItem> OrderItems {get; set;}
        public long Subtotal {get; set;}
        public long Tax {get; set;}
        public OrderStatus OrderStatus {get; set;} = OrderStatus.Pending;
        public string PaymentIntentId {get; set;}

        public long GetTotal()
        {
            return Subtotal + Tax;
        }
    }
}