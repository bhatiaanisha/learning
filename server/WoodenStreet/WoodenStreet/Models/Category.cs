using System;
using System.Collections.Generic;

namespace WoodenStreet.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public int? FurnitureItemId { get; set; }

    public string CategoryName { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public DateTime ModifiedDate { get; set; }

    public virtual FurnitureItem? FurnitureItem { get; set; }

    public virtual ICollection<SubCategory> SubCategories { get; } = new List<SubCategory>();
}
