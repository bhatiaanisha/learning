using System;
using System.Collections.Generic;

namespace WoodenStreet.Models
{
    public partial class Cart
    {
        public Cart()
        {
            CartItems = new HashSet<CartItem>();
            Orders = new HashSet<Order>();
        }

        public int CartId { get; set; }
        public int? UserId { get; set; }
        public int? CartTotal { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
