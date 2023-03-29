using Microsoft.AspNetCore.Mvc;
using WoodenStreet.Models;

namespace WoodenStreet.IServices
{
    public interface ICategoryService : IRepository<Category>
    {
        public Task<IActionResult> GetCategory();
    }
}
