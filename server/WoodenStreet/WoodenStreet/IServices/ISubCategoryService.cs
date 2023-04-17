using Microsoft.AspNetCore.Mvc;
using WoodenStreet.Models;

namespace WoodenStreet.IServices
{
    public interface ISubCategoryService : IRepository<SubCategory>
    {
        public Task<IActionResult> GetSubCategory();
    }
}
