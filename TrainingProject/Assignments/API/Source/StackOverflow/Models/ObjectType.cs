using System;
using System.Collections.Generic;

#nullable disable

namespace StackOverflow.Models
{
    public partial class ObjectType
    {
        public ObjectType()
        {
            Objects = new HashSet<Object>();
        }

        public int ObjectTypeId { get; set; }
        public string ObjectTypeName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual ICollection<Object> Objects { get; set; }
    }
}
