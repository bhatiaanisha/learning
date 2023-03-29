using System;
using System.Collections.Generic;

#nullable disable

namespace StackOverflow.Models
{
    public partial class QuestionComment
    {
        public int QuestionCommentId { get; set; }
        public string QuestionCommentBody { get; set; }
        public int QuestionId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual Question Question { get; set; }
        public virtual User User { get; set; }
    }
}
