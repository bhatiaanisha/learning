using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StackOverflow.IServices;

namespace StackOverflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionVoteController : ControllerBase
    {
        //private IQuestionVoteService QuestionVoteService { get; set; }
        //public QuestionVoteController(IQuestionVoteService questionVoteService)
        //{
        //    QuestionVoteService = questionVoteService;
        //}

        //[HttpGet]
        //public async Task<IActionResult> GetQuestionVotes()
        //{
        //    return await QuestionVoteService.GetAll();
        //}
    }
}
