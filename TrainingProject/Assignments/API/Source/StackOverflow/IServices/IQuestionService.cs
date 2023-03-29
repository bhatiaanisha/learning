using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StackOverflow.Models;

namespace StackOverflow.IServices
{
    public interface IQuestionService : IRepository<Question>
    {
        //public Task<IActionResult> GetQuestionTags();
        //public Task<IActionResult> GetQuestionDetails(int id);
        //public Task<IActionResult> GetDetailsByTagName(string tagname);
        //public Task<IActionResult> Search(string search);
        //public Task<IActionResult> CountAnswers(int id);
    }
}
