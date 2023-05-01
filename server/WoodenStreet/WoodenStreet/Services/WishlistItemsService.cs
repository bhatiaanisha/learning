using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Services
{
    public class WishlistItemsService : Repository<WishlistItem>, IWishlistItemsService
    {
        public WishlistItemsService(WoodenStreetContext woodenStreetContext) : base(woodenStreetContext)
        {

        }
    }
}
