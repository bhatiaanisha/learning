using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Services
{
    public class ImageService : Repository<Image>, IImageService
    {
        public ImageService(WoodenStreetContext woodenStreetContext) : base(woodenStreetContext)
        {

        }

        public async Task<IActionResult> DeleteImageByProductId(int productId)
        {
            var response = await _DbContext.Images.Where(x => x.ProductId == productId).ToListAsync();

            if (response != null)
            {
                for (int i = 0; i < response.Count; i++)
                {
                    _DbContext.Remove(response[i]);
                }
            await _DbContext.SaveChangesAsync();
            return new OkObjectResult(new { message = "Data Deleted Successfully" });
            }
            else
            {
                return new NotFoundObjectResult(new { message = "No such id exists" });
            }

            //if(response != null) 
            //{
            //    _DbContext.Remove(response);
            //    await _DbContext.SaveChangesAsync();
            //    return new OkObjectResult(new { message = "Data Deleted Successfully" });
            //}
            //else
            //{
            //    return new NotFoundObjectResult(new { message = "No such id exists" });
            //}
        }
    }
}
