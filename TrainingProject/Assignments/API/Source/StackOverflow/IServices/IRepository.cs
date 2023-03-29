using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StackOverflow.IServices
{
    public interface IRepository<Tentity> where Tentity:class
    {
        public Task<IActionResult> GetAll();
        public Task<IActionResult> GetById(int id);
        public Task<IActionResult> Post(Tentity entity);
        public Task<IActionResult> Put(int id, Tentity entity1);
        public Task<IActionResult> Delete(int id);
    }
}
