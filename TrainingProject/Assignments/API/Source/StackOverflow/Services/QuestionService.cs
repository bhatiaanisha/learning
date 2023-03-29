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
    public class QuestionService : Repository<Question>, IQuestionService
    {
        public QuestionService(StackOverflowDemoContext stackOverflowDemoContext) : base(stackOverflowDemoContext)
        {

        }

        //public async Task<IActionResult> CountAnswers(int id)
        //{
        //    var result = await _DbContext.CountAnswersDTO.FromSqlRaw<CountAnswersDTO>("exec uspCountAnswers {0}", id).ToListAsync();
        //    return new OkObjectResult(result);
        //}

        //public async Task<IActionResult> GetDetailsByTagName(string tagname)
        //{
        //    var result = await _DbContext.QuestionDTOs.FromSqlRaw<QuestionDTO>($"exec uspGetDetailsByTagName {tagname}").ToListAsync();
        //    return new OkObjectResult(result);
        //}

        //public async Task<IActionResult> GetQuestionDetails(int id)
        //{
        //    var result = await _DbContext.QuestionDetailsDTOs.FromSqlRaw<QuestionDetailsDTO>("uspGetQuestionDetails {0}", id).ToListAsync();
        //    if (result.Count == 0)
        //    {
        //        return new NotFoundObjectResult(new { message = "No such id exists!" });
        //    }
        //    return new OkObjectResult(result);
        //}

        //public async Task<IActionResult> GetQuestionTags()
        //{
        //    var result = await _DbContext.QuestionDTOs.FromSqlRaw<QuestionDTO>("exec uspGetAllDetails").ToListAsync();
        //    return new OkObjectResult(result);
        //}

        //public async Task<IActionResult> Search(string search)
        //{
        //    var result = await _DbContext.QuestionDTOs.FromSqlRaw<QuestionDTO>($"exec uspSearch {search}").ToListAsync();
        //    return new OkObjectResult(result);
        //}


    }
}
