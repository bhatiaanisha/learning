using System;
using System.Collections.Generic;

namespace WoodenStreet.Models
{
    public partial class WishlistItem
    {
        public int WishlistItemId { get; set; }
        public int? WishlistId { get; set; }
        public int? ProductId { get; set; }
        public bool? IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual Product? Product { get; set; }
        public virtual Wishlist? Wishlist { get; set; }
    }
}
