using System;
using System.Collections.Generic;

namespace WoodenStreet.Models
{
    public partial class Wishlist
    {
        public Wishlist()
        {
            WishlistItems = new HashSet<WishlistItem>();
        }

        public int WishlistId { get; set; }
        public int? UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<WishlistItem> WishlistItems { get; set; }
    }
}
