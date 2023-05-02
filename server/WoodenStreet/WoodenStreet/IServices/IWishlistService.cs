using Microsoft.AspNetCore.Mvc;
using WoodenStreet.Models;

namespace WoodenStreet.IServices
{
    public interface IWishlistService : IRepository<Wishlist>
    {
        public Task<IActionResult> GetWishlistData(int userId);
    }
}
