using System;
using System.Collections.Generic;

namespace WoodenStreet.Models
{
    public partial class Object
    {
        public Object()
        {
            Orders = new HashSet<Order>();
            Users = new HashSet<User>();
        }

        public int ObjectId { get; set; }
        public int ObjectTypeId { get; set; }
        public string ObjectValue { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual ObjectType ObjectType { get; set; } = null!;
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
