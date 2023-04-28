using Microsoft.AspNetCore.Mvc;
using WoodenStreet.Models;

namespace WoodenStreet.IServices
{
    public interface IImageService : IRepository<Image>
    {
        public Task<IActionResult> DeleteImageByProductId(int productId);
    }
}
