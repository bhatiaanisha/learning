using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryService _CategoryService { get; set; }
        public CategoryController(ICategoryService categoryService)
        {
            _CategoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            return await _CategoryService.GetCategory();
        }

        [HttpPost]
        public async Task<IActionResult> PostCategory(Category category)
        {
            return await _CategoryService.Post(category);
        }
    }
}
