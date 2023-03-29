using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StackOverflow.Models;
using StackOverflow.IServices;
using Microsoft.AspNetCore.Mvc;
using static StackOverflow.Enums.Enums;

namespace StackOverflow.IServices
{
    public interface IQuestionVoteService : IRepository<QuestionVote>
    {
        //public Task<IActionResult> PostQuestionVotes(QuestionVote questionVote, VoteType voteType);
    }
}
