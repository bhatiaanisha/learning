using System;
using System.Collections.Generic;

namespace WoodenStreet.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int? CartId { get; set; }

    public int OrderStatusType { get; set; }

    public int? Discount { get; set; }

    public int? GrandTotal { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime ModifiedDate { get; set; }

    public virtual Cart? Cart { get; set; }

    public virtual Object OrderStatusTypeNavigation { get; set; } = null!;

    public virtual ICollection<Payment> Payments { get; } = new List<Payment>();
}
