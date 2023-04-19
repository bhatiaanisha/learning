using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WoodenStreet.IServices;

namespace WoodenStreet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductOverviewController : ControllerBase
    {
        private IProductOverviewService _ProductOverviewService { get; set; }

        public ProductOverviewController(IProductOverviewService productOverviewService)
        {
            _ProductOverviewService = productOverviewService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductOverview()
        {
            return await _ProductOverviewService.GetAll();
        }
    }
}
