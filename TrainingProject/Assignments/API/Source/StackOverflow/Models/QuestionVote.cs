using System;
using System.Collections.Generic;

#nullable disable

namespace StackOverflow.Models
{
    public partial class QuestionVote
    {
        public int QuestionVoteId { get; set; }
        public int QuestionId { get; set; }
        public int UserId { get; set; }
        public int VoteType { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual Question Question { get; set; }
        public virtual User User { get; set; }
        public virtual Object VoteTypeNavigation { get; set; }
    }
}
