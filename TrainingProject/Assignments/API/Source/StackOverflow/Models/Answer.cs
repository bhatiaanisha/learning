using System;
using System.Collections.Generic;

#nullable disable

namespace StackOverflow.Models
{
    public partial class Answer
    {
        public Answer()
        {
            AnswerComments = new HashSet<AnswerComment>();
            AnswerVotes = new HashSet<AnswerVote>();
        }

        public int AnswerId { get; set; }
        public string AnswerBody { get; set; }
        public int QuestionId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual Question Question { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<AnswerComment> AnswerComments { get; set; }
        public virtual ICollection<AnswerVote> AnswerVotes { get; set; }
    }
}
