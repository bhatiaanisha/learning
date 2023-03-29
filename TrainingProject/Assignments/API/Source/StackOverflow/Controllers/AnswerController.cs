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
    //public class AnswerController : ControllerBase
    //{
    //    private IAnswerService AnswerService { get; set; }
    //    public AnswerController(IAnswerService answerService)
    //    {
    //        AnswerService = answerService;
    //    }

    //    [HttpGet]
    //    public async Task<IActionResult> GetAnswers()
    //    {
    //        return await AnswerService.GetAll();
    //    }

    //    [HttpGet("{id}")]
    //    public async Task<IActionResult> GetAnswerDetails(int id)
    //    {
    //        return await AnswerService.GetAnswerDetails(id);
    //    }

    //    [HttpPost]
    //    public async Task<IActionResult> PostAnswer([FromBody] Answer answer)
    //    {
    //        return await AnswerService.Post(answer);
    //    }
    //}
}
