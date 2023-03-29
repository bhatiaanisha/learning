using System;
using System.Collections.Generic;

#nullable disable

namespace StackOverflow.Models
{
    public partial class AnswerVote
    {
        public int AnswerVoteId { get; set; }
        public int AnswerId { get; set; }
        public int UserId { get; set; }
        public int VoteType { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual Answer Answer { get; set; }
        public virtual User User { get; set; }
        public virtual Object VoteTypeNavigation { get; set; }
    }
}
