using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StackOverflow.IServices;
using StackOverflow.Models;

namespace StackOverflow.Services
{
    public class QuestionVoteService : Repository<QuestionVote>, IQuestionVoteService
    {
        public QuestionVoteService(StackOverflowDemoContext stackOverflowDemoContext) : base(stackOverflowDemoContext)
        {

        }

        public async Task<IActionResult> PostQuestionVotes(QuestionVote questionVote, Enums.Enums.VoteType voteType)
        {
            if (questionVote == null)
            {
                return new NotFoundObjectResult(new { message = "No data given for post" });
            }
            else
            {
                return new OkObjectResult(questionVote);
            }
        }
    }
}
