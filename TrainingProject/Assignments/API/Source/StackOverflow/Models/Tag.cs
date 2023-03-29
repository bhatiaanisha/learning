using System;
using System.Collections.Generic;

#nullable disable

namespace StackOverflow.Models
{
    public partial class Tag
    {
        public Tag()
        {
            QuestionTags = new HashSet<QuestionTag>();
        }

        public int TagId { get; set; }
        public string TagName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual ICollection<QuestionTag> QuestionTags { get; set; }
    }
}
