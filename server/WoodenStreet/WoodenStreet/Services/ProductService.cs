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
            if (response.Count > 0)
            {
                return new OkObjectResult(response);
            }
            else
            {
                return new NotFoundObjectResult(new { message = "No Records Found" });
            }
        }

        public async Task<IActionResult> GetProductsByQuery(string itemName)
        {
            var response = await _DbContext.ProductDTOs.FromSqlRaw<ProductDTO>("exec uspGetProductsByQuery {0}", itemName).ToListAsync();
            if(response.Count > 0) 
            {
                return new OkObjectResult(response);
            }
            else
            {
                return new NotFoundObjectResult(new { message = "No Products found for the specified furniture item name" });
            }
        }

        public async Task<IActionResult> GetProductDetailById(int id)
        {
            var response = await _DbContext.ProductDetailDTOs.FromSqlRaw<ProductDetailDTO>("exec uspGetProductDetails {0}",id).ToListAsync();
            if (response != null)
            {
                return new OkObjectResult(response);
            }
            else
            {
                return new NotFoundObjectResult(new { message = "No Records Found" });
            }
        }

        //public async Task<IActionResult> GetProductEditFormDetails(int id)
        //{
        //    var response = await _DbContext.ProductEditDTOs.FromSqlRaw<ProductEditDTO>("exec uspGetProductEditDetails ")
        //}
    }
}
