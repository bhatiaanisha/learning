using System;
using System.Collections.Generic;

#nullable disable

namespace StackOverflow.Models
{
    public partial class Object
    {
        public Object()
        {
            AnswerVotes = new HashSet<AnswerVote>();
            QuestionVotes = new HashSet<QuestionVote>();
            Users = new HashSet<User>();
        }

        public int ObjectId { get; set; }
        public int ObjectTypeId { get; set; }
        public string ObjectValue { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual ObjectType ObjectType { get; set; }
        public virtual ICollection<AnswerVote> AnswerVotes { get; set; }
        public virtual ICollection<QuestionVote> QuestionVotes { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
