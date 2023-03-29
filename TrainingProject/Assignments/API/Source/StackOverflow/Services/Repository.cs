using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackOverflow.IServices;
using StackOverflow.Models;

namespace StackOverflow.Services
{
    public class Repository<T> : IRepository<T> where T : class
    {
        public StackOverflowDemoContext _DbContext { get; set; }
        public Repository(StackOverflowDemoContext stackOverflowDemoContext)
        {
            _DbContext = stackOverflowDemoContext;
        }

        public async Task<IActionResult> GetAll()
        {
            var result = await _DbContext.Set<T>().ToListAsync();
            if (result.Count == 0)
            {
                return new NotFoundObjectResult(new { message = "No data Found!" });
            }
            else
            {
                return new OkObjectResult(result);
            }
        }

        public async Task<IActionResult> GetById(int id)
        {
            var result = await _DbContext.Set<T>().FindAsync(id);
            if (result == null)
            {
                return new NotFoundObjectResult(new { message = "No such data for the specified id exists!" });
            }
            else
            {
                return new OkObjectResult(result);
            }
        }

        public async Task<IActionResult> Post(T entity)
        {
            if (entity == null)
            {
                return new NotFoundObjectResult(new { message = "No data given for insertion!" });
            }
            else
            {
                await _DbContext.AddAsync(entity);
                await _DbContext.SaveChangesAsync();
                return new OkObjectResult(new { message = "Inserted data successfully" });
            }
        }

        public async Task<IActionResult> Put(int id, T entity1)
        {
            var result = await _DbContext.Set<T>().FindAsync(id);
            if (result == null)
            {
                return new NotFoundObjectResult(new { message = "No such data for the specified id exists!" });
            }
            else
            {
                _DbContext.Entry<T>(result).CurrentValues.SetValues(entity1);
                await _DbContext.SaveChangesAsync();
                return new OkObjectResult(new { message = "Updated Successfully" });
            }
        }

        public async Task<IActionResult> Delete(int id)
        {
            var result = await _DbContext.Set<T>().FindAsync(id);
            if (result == null)
            {
                return new NotFoundObjectResult(new { message = "No such id exists!" });
            }
            else
            {
                _DbContext.Remove(result);
                await _DbContext.SaveChangesAsync();
                return new OkObjectResult(result);
            }
        }
    }
}
