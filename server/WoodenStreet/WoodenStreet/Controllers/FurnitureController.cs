using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WoodenStreet.IServices;

namespace WoodenStreet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FurnitureController : ControllerBase
    {
        private IFurnitureService _FurnitureService { get; set; }
        public FurnitureController(IFurnitureService furnitureService)
        {
            _FurnitureService = furnitureService;
        }

        [HttpGet]
        public async Task<IActionResult> GetFurnitureItems()
        {
            return await _FurnitureService.GetAll();
        }
    }
}
