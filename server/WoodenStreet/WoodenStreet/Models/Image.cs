using System;
using System.Collections.Generic;

namespace WoodenStreet.Models
{
    public partial class Image
    {
        public int ImageId { get; set; }
        public int? ProductId { get; set; }
        public string ProductImageUrl { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual Product? Product { get; set; }
    }
}
