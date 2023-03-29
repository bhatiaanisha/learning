using System;
using System.Collections.Generic;

#nullable disable

namespace StackOverflow.Models
{
    public partial class Question
    {
        public Question()
        {
            Answers = new HashSet<Answer>();
            QuestionComments = new HashSet<QuestionComment>();
            QuestionTags = new HashSet<QuestionTag>();
            QuestionVotes = new HashSet<QuestionVote>();
        }

        public int QuestionId { get; set; }
        public string QuestionTitle { get; set; }
        public string QuestionBody { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }
        public virtual ICollection<QuestionComment> QuestionComments { get; set; }
        public virtual ICollection<QuestionTag> QuestionTags { get; set; }
        public virtual ICollection<QuestionVote> QuestionVotes { get; set; }
    }
}
