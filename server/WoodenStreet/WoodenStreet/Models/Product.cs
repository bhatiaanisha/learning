using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace WoodenStreet.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public int? SubCategoryId { get; set; }

    public string ProductName { get; set; } = null!;

    public string? CompanyName { get; set; }

    public bool? IsRated { get; set; }

    public int? Ratings { get; set; }

    public int? Reviews { get; set; }

    public int? OriginalPrice { get; set; }

    public int? DiscountedPrice { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime ModifiedDate { get; set; }

    public virtual ICollection<CartItem> CartItems { get; } = new List<CartItem>();

    public virtual ICollection<Image> Images { get; } = new List<Image>();

    public virtual ICollection<ProductOverview> ProductOverviews { get; } = new List<ProductOverview>();

    public virtual SubCategory? SubCategory { get; set; }

    public virtual ICollection<WishlistItem> WishlistItems { get; } = new List<WishlistItem>();
}

[Keyless]
public class ProductDTO
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public string? CompanyName { get; set; }

    public bool? IsRated { get; set; }

    public int? Ratings { get; set; }

    public int? DiscountedPrice { get; set; }

    public int? OriginalPrice { get; set; }

    public string ProductImageUrl { get; set; } = null!;
}

[Keyless]
public class ProductDetailDTO
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public int? Ratings { get; set; }

    public int? Reviews { get; set; }

    public int? OriginalPrice { get; set; }

    public int? DiscountedPrice { get; set; }

    public string? Seater { get; set; }

    public string? Material { get; set; }

    public string? Color { get; set; }

    public string? DimensionsInInch { get; set; }

    public string? Mechanism { get; set; }

    public string? DimensionsInCm { get; set; }

    public string? Foam { get; set; }

    public string? WeightCapacity { get; set; }

    public string? Width { get; set; }

    public string? Warranty { get; set; }

    public string? ShipsIn { get; set; }

    public string? DeliveryCondition { get; set; }

    public string? Sku { get; set; }

    public string ProductImageUrl { get; set; } = null!;
}