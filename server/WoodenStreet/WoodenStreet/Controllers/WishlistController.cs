using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private IWishlistService _WishlistService { get; set; }

        public WishlistController(IWishlistService wishlistService)
        {
            _WishlistService = wishlistService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllWishlists()
        {
            return await _WishlistService.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWishlistById(int id)
        {
            return await _WishlistService.GetById(id);
        }

        [HttpGet("data/{userId}")]
        public async Task<IActionResult> GetWishlistByUserId(int userId)
        {
            return await _WishlistService.GetWishlistData(userId);
        }

        [HttpPost]
        public async Task<IActionResult> CreateWishlist(Wishlist wishlist)
        {
            return await _WishlistService.Post(wishlist);
        }
    }
}
