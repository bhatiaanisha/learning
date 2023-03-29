using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

#nullable disable

namespace StackOverflow.Models
{
    public partial class User
    {
        public User()
        {
            AnswerComments = new HashSet<AnswerComment>();
            AnswerVotes = new HashSet<AnswerVote>();
            Answers = new HashSet<Answer>();
            QuestionComments = new HashSet<QuestionComment>();
            QuestionVotes = new HashSet<QuestionVote>();
            Questions = new HashSet<Question>();
        }

        public int UserId { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int Reputation { get; set; }
        public int UserType { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        [JsonIgnore]
        public virtual Object UserTypeNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<AnswerComment> AnswerComments { get; set; }
        [JsonIgnore]
        public virtual ICollection<AnswerVote> AnswerVotes { get; set; }
        [JsonIgnore]
        public virtual ICollection<Answer> Answers { get; set; }
        [JsonIgnore]
        public virtual ICollection<QuestionComment> QuestionComments { get; set; }
        [JsonIgnore]
        public virtual ICollection<QuestionVote> QuestionVotes { get; set; }
        [JsonIgnore]
        public virtual ICollection<Question> Questions { get; set; }
    }

    [Keyless]
    public class UserRegisterDTO
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    [Keyless]
    public class UserLoginDTO
    {
        [Required]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    [Keyless]
    public class UserVM
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
