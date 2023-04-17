using System;
using System.Collections.Generic;

namespace WoodenStreet.Models
{
    public partial class ProductOverview
    {
        public int ProductOverviewId { get; set; }
        public int? ProductId { get; set; }
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
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual Product? Product { get; set; }
    }
}
