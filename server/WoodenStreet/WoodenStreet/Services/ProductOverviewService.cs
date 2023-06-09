﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Services
{
    public class ProductOverviewService : Repository<ProductOverview>, IProductOverviewService
    {
        public ProductOverviewService(WoodenStreetContext woodenStreetContext) : base(woodenStreetContext)
        {

        }

        public async Task<IActionResult> DeleteOverviewByProductId(int productId)
        {
            var response = await _DbContext.ProductOverviews.Where(x => x.ProductId == productId).ToListAsync();

            if (response.Count > 0)
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
        }
    }
}
