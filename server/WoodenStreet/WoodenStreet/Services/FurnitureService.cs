using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Services
{
    public class FurnitureService : Repository<FurnitureItem>, IFurnitureService
    {
        public FurnitureService(WoodenStreetContext woodenStreetContext) : base(woodenStreetContext)
        {

        }
    }
}
