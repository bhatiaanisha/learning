using Microsoft.AspNetCore.Mvc;
using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Services
{
    public class SubCategoryService : Repository<SubCategory>,ISubCategoryService
    {
        public SubCategoryService(WoodenStreetContext woodenStreetContext) : base(woodenStreetContext)
        {
            
        }

        public async Task<IActionResult> GetSubCategory()
        {
            var subCategoryList = _DbContext.SubCategories.ToList();
            var categoryList = _DbContext.Categories.ToList();

            var response =  (from sc in subCategoryList
                            join c in categoryList on sc.CategoryId equals c.CategoryId
                            select new
                            {   
                                sc.SubCategoryId,
                                c.CategoryName,
                                sc.SubCategoryName,
                                sc.CreatedDate, 
                                sc.ModifiedDate
                            }).ToList();
            if(response != null)
            {
                return new OkObjectResult(response);
            }
            else
            {
                return new NotFoundObjectResult(new { message = "No records Found" });
            }
        }
    }
}
