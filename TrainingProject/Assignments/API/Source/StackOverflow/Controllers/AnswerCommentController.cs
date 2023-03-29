using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using StackOverflow.Models;
using StackOverflow.IServices;

namespace StackOverflow.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    //public class AnswerCommentController : ControllerBase
    //{
    //    private IAnswerCommentService AnswerCommentService { get; set; }
    //    public AnswerCommentController(IAnswerCommentService answerCommentService)
    //    {
    //        AnswerCommentService = answerCommentService;
    //    }

    //    [HttpPost]
    //    public async Task<IActionResult> PostAnswerComments([FromBody] AnswerComment answerComment)
    //    {
    //        return await AnswerCommentService.Post(answerComment);
    //    }

    //    [HttpGet("{answerId}")]
    //    public async Task<IActionResult> GetAnswerComments(int answerId)
    //    {
    //        return await AnswerCommentService.GetAnswerComments(answerId);
    //    }
    //}
}
