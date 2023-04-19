using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WoodenStreet.IServices;
using WoodenStreet.Models;

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

        [HttpGet("original")]
        public async Task<IActionResult> GetAllProducts()
        {
            return await _ProductService.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            return await _ProductService.GetById(id);
        }

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetProductDetail(int id)
        {
            return await _ProductService.GetProductDetailById(id);
        }

        [HttpPost]
        public async Task<IActionResult> PostProduct(Product product)
        {
            return await _ProductService.Post(product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id,Product product)
        {
            return await _ProductService.Put(id, product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            return await _ProductService.Delete(id);
        }
    }
}
