using Microsoft.EntityFrameworkCore;
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

    [Keyless]

    public class WishlistDataDTO
    {
        public int WishlistId { get; set; }
        public int? UserId { get; set; }
        public int WishlistItemId { get; set; }
        public int? ProductId { get; set; }
        public bool? IsActive { get; set; }
        public string ProductName { get; set; } = null!;
        public int? OriginalPrice { get; set; }
        public int? DiscountedPrice { get; set; }
        public string? Sku { get; set; }
        public string ProductImageUrl { get; set; } = null!;
    }
}
