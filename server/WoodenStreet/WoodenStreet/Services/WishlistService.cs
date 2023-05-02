using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Services
{
    public class WishlistService : Repository<Wishlist>, IWishlistService
    {
        public WishlistService(WoodenStreetContext woodenStreetContext) : base(woodenStreetContext)
        {

        }

        public async Task<IActionResult> GetWishlistData(int userId)
        {
            var response = await _DbContext.WishlistDataDTOs.FromSqlRaw<WishlistDataDTO>("exec uspGetWishlistItems {0}",userId).ToListAsync();
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
