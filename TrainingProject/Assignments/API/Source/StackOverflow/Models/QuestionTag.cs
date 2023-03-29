using System;
using System.Collections.Generic;

#nullable disable

namespace StackOverflow.Models
{
    public partial class QuestionTag
    {
        public int QuestionTagId { get; set; }
        public int QuestionId { get; set; }
        public int TagId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual Question Question { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
