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
    public class AnswerCommentService : Repository<AnswerComment>, IAnswerCommentService
    {
        public AnswerCommentService(StackOverflowDemoContext stackOverflowDemoContext) : base(stackOverflowDemoContext)
        {

        }

        //public async Task<IActionResult> GetAnswerComments(int answerId)
        //{
        //    var result = await _DbContext.AnswerCommentDTOs.FromSqlRaw<AnswerCommentDTO>("EXEC uspAnswerComments {0}", answerId).ToListAsync();
        //    return new OkObjectResult(result);
        //}
    }
}
