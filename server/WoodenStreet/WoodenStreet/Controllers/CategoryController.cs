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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            return await _CategoryService.GetById(id);
        }

        [HttpPost]
        public async Task<IActionResult> PostCategory(Category category)
        {
            return await _CategoryService.Post(category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id,Category category)
        {
            return await _CategoryService.Put(id,category);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            return await _CategoryService.Delete(id);
        }
    }
}
