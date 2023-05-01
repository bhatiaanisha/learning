using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WoodenStreet.IServices;

namespace WoodenStreet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistItemController : ControllerBase
    {
        private IWishlistItemsService _WishlistItemsService { get; set; }

        public WishlistItemController(IWishlistItemsService wishlistItemsService)
        {
            _WishlistItemsService = wishlistItemsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllWishlistItems()
        {
            return await _WishlistItemsService.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWishlistItemsById(int id)
        {
            return await _WishlistItemsService.GetById(id);
        }
    }
}
