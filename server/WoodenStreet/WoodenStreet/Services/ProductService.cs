using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Services
{
    public class ProductService : Repository<Product>, IProductService
    {
        public ProductService(WoodenStreetContext woodenStreetContext) : base(woodenStreetContext)
        {
            
        }

        public async Task<IActionResult> GetAllProducts()
        {
            var response = await _DbContext.ProductDTOs.FromSqlRaw<ProductDTO>("exec uspGetProducts").ToListAsync();
            return new OkObjectResult(response);
        }

        public async Task<IActionResult> GetProductDetailById(int id)
        {
            var response = await _DbContext.ProductDetailDTOs.FromSqlRaw<ProductDetailDTO>("exec uspGetProductDetails {0}",id).ToListAsync();
            return new OkObjectResult(response);
        }
    }
}
