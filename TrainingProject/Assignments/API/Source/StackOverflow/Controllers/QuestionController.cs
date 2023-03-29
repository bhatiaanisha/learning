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
    //public class QuestionController : ControllerBase
    //{
    //    private IQuestionService QuestionService { get; set; }

    //    public QuestionController(IQuestionService questionService)
    //    {
    //        QuestionService = questionService;
    //    }

    //    [HttpGet]
    //    public async Task<IActionResult> GetQuestions()
    //    {
    //        return await QuestionService.GetAll();
    //    }

    //    [HttpGet("{id}")]
    //    public async Task<IActionResult> GetQuestionDetails(int id)
    //    {
    //        return await QuestionService.GetQuestionDetails(id);
    //    }

    //    [HttpPost]
    //    public async Task<IActionResult> InsertQuestion(Question question)
    //    {
    //        return await QuestionService.Post(question);
    //    }

    //    [HttpPut("{id}")]
    //    public async Task<IActionResult> UpdateQuestion(int id, Question question)
    //    {
    //        return await QuestionService.Put(id, question);
    //    }

    //    [HttpDelete("{id}")]
    //    public async Task<IActionResult> DeleteQuestion(int id)
    //    {
    //        return await QuestionService.Delete(id);
    //    }

    //    [HttpGet("questiontag")]
    //    public async Task<IActionResult> GetQuestionTags()
    //    {
    //        return await QuestionService.GetQuestionTags();
    //    }

    //    [HttpGet("tagname")]
    //    public async Task<IActionResult> GetDetailsByTagName(string tagname)
    //    {
    //        return await QuestionService.GetDetailsByTagName(tagname);
    //    }

    //    [HttpGet("search")]
    //    public async Task<IActionResult> SearchCriteria(string search)
    //    {
    //        return await QuestionService.Search(search);
    //    }

    //    [HttpGet("count/{id}")]
    //    public async Task<IActionResult> AnswerCount(int id)
    //    {
    //        return await QuestionService.CountAnswers(id);
    //    }
    //}
}
