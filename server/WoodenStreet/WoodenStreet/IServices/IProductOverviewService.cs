using Microsoft.AspNetCore.Mvc;
using WoodenStreet.Models;

namespace WoodenStreet.IServices
{
    public interface IProductOverviewService : IRepository<ProductOverview>
    {
        public Task<IActionResult> DeleteOverviewByProductId(int productId);
    }
}
