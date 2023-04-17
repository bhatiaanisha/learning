using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoryController : ControllerBase
    {
        private ISubCategoryService _SubCategoryService { get; set; }
        public SubCategoryController(ISubCategoryService subCategoryService)
        {
            _SubCategoryService = subCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubCategories()
        {   
            return await _SubCategoryService.GetSubCategory();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubCategoryById(int id)
        {
            return await _SubCategoryService.GetById(id);
        }

        [HttpPost]
        public async Task<IActionResult> PostSubCategory(SubCategory subCategory)
        {
            return await _SubCategoryService.Post(subCategory);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubCategory(int id,SubCategory subCategory)
        {
            return await _SubCategoryService.Put(id, subCategory);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubCategory(int id)
        {
            return await _SubCategoryService.Delete(id);
        }
    }
}
