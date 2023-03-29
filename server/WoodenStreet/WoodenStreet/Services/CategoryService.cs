using Microsoft.AspNetCore.Mvc;
using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Services
{
    public class CategoryService : Repository<Category>, ICategoryService
    {
        public CategoryService(WoodenStreetContext woodenStreetContext) : base(woodenStreetContext)
        {

        }

        public async Task<IActionResult> GetCategory()
        {
            var categoryList = _DbContext.Categories.ToList();
            var furnitureItemList = _DbContext.FurnitureItems.ToList();

            var response = (from c in categoryList
                           join fi in furnitureItemList on  c.FurnitureItemId equals fi.FurnitureItemId
                           select new
                           {
                               c.CategoryId,
                               fi.FurnitureItemName,
                               c.CategoryName,
                               c.ImageUrl,
                               c.CreatedDate,
                               c.ModifiedDate
                           }).ToList();
            if(response != null) 
            {
                return new OkObjectResult(response);
            }
            else
            {
                return new NotFoundObjectResult(new { message = "No Records Found" });
            }
        }
    }
}
