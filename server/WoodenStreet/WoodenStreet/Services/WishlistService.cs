using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Services
{
    public class WishlistService : Repository<Wishlist>, IWishlistService
    {
        public WishlistService(WoodenStreetContext woodenStreetContext) : base(woodenStreetContext)
        {

        }
    }
}
