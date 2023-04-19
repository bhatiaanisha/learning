using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Services
{
    public class ProductOverviewService : Repository<ProductOverview>, IProductOverviewService
    {
        public ProductOverviewService(WoodenStreetContext woodenStreetContext) : base(woodenStreetContext)
        {

        }
    }
}
