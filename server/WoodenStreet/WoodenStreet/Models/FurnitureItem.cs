﻿using System;
using System.Collections.Generic;

namespace WoodenStreet.Models
{
    public partial class FurnitureItem
    {
        public FurnitureItem()
        {
            Categories = new HashSet<Category>();
        }

        public int FurnitureItemId { get; set; }
        public string FurnitureItemName { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string? ImageUrl { get; set; }

        public virtual ICollection<Category> Categories { get; set; }
    }
}
