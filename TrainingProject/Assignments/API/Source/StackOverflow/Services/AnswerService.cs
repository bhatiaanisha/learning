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
    public class AnswerService : Repository<Answer>, IAnswerService
    {
        public AnswerService(StackOverflowDemoContext stackOverflowDemoContext) : base(stackOverflowDemoContext)
        {

        }

        //public async Task<IActionResult> GetAnswerDetails(int id)
        //{
        //    var result = await _DbContext.AnswerDetailsDTOs.FromSqlRaw<AnswerDetailsDTO>($"exec uspAnswerDetails {id}").ToListAsync<AnswerDetailsDTO>();
        //    return new OkObjectResult(result);
        //}
    }
}
