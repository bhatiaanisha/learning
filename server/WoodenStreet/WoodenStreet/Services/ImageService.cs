using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Services
{
    public class ImageService : Repository<Image>, IImageService
    {
        public ImageService(WoodenStreetContext woodenStreetContext) : base(woodenStreetContext)
        {

        }
    }
}
