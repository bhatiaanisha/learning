using System;
using System.Collections.Generic;

namespace WoodenStreet.Models
{
    public partial class SubCategory
    {
        public SubCategory()
        {
            Products = new HashSet<Product>();
        }

        public int SubCategoryId { get; set; }
        public int? CategoryId { get; set; }
        public string SubCategoryName { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual Category? Category { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
