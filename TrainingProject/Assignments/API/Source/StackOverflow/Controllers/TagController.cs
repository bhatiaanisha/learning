using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StackOverflow.IServices;
using StackOverflow.Models;

namespace StackOverflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private ITagService TagService { get; set; }
        public TagController(ITagService tagService)
        {
            TagService = tagService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTags()
        {
            return await TagService.GetAll();
        }

        [HttpPost]
        public async Task<IActionResult> PostTags(Tag tag)
        {
            return await TagService.Post(tag);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTags(int id, [FromBody] Tag tag)
        {
            return await TagService.Put(id, tag);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTags(int id)
        {
            return await TagService.Delete(id);
        }
    }
}
