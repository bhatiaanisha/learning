using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WoodenStreet.IServices;

namespace WoodenStreet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductService _ProductService { get; set; }

        public ProductController(IProductService productService)
        {
            _ProductService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return await _ProductService.GetAllProducts();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductDetail(int id)
        {
            return await _ProductService.GetProductDetailById(id);
        }
    }
}
