using System;
using System.Collections.Generic;

namespace WoodenStreet.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int? OrderId { get; set; }

    public int? TotalAmount { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime ModifiedDate { get; set; }

    public virtual Order? Order { get; set; }
}
