using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WoodenStreet.IServices;
using WoodenStreet.Models;

namespace WoodenStreet.Services
{
    public class Repository<T> : IRepository<T> where T : class
    {
        public WoodenStreetContext _DbContext { get; set; }

        public Repository(WoodenStreetContext dbContext)
        {
            _DbContext = dbContext;
        }

        public async Task<IActionResult> GetAll()
        {
            var response = await _DbContext.Set<T>().ToListAsync();
            if(response.Count > 0) 
            {
                return new OkObjectResult(response);
            }
            else
            {
                return new NotFoundObjectResult(new { message = "No Records Found" });
            }
        }

        public async Task<IActionResult> GetById(int id)
        {
            var response = await _DbContext.Set<T>().FindAsync(id);
            if (response != null)
            {
                return new OkObjectResult(response);
            }
            else
            {
                return new NotFoundObjectResult(new { message = "No such id exists" });
            }
        }

        public async Task<IActionResult> Post(T tentity)
        {
            if(tentity != null) 
            {
                await _DbContext.AddAsync(tentity);
                await _DbContext.SaveChangesAsync();
                return new OkObjectResult(new { message = "Data Inserted Successfully" });
            }
            else
            {
                return new NotFoundObjectResult(new { message = "No data was provided for insertion" });
            }
        }

        public async Task<IActionResult> Put(int id, T tentity)
        {
            var response = await _DbContext.Set<T>().FindAsync(id);
            if(response != null) 
            {
                _DbContext.Entry<T>(response).CurrentValues.SetValues(tentity);
                await _DbContext.SaveChangesAsync();
                return new OkObjectResult(new { message = "Data Updated Successfully" });
            }
            else
            {
                return new NotFoundObjectResult(new { message = "No such id exists" });
            }
        }

        public async Task<IActionResult> Delete(int id)
        {
            var response = await _DbContext.Set<T>().FindAsync(id);
            if(response != null)
            {
                _DbContext.Remove(response);
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
