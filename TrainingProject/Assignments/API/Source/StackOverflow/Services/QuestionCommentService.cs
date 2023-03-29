using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StackOverflow.Models;
using StackOverflow.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace StackOverflow.Services
{
    public class QuestionCommentService : Repository<QuestionComment>, IQuestionCommentService
    {
        public QuestionCommentService(StackOverflowDemoContext stackOverflowDemoContext) : base(stackOverflowDemoContext)
        {

        }

        //public async Task<IActionResult> GetQuestionComments(int questionId)
        //{
        //    var result = await _DbContext.QuestionCommentDTOs.FromSqlRaw<QuestionCommentDTO>("EXEC uspQuestionComments {0}", questionId).ToListAsync();
        //    return new OkObjectResult(result);
        //}
    }
}
