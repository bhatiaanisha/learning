using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace WoodenStreet.IServices
{
    public interface IRepository<Tentity> where Tentity : class
    {
        public Task<IActionResult> GetAll();
        public Task<IActionResult> GetById(int id);
        public Task<IActionResult> Post(Tentity tentity);
        public Task<IActionResult> Put(int id, Tentity tentity);
        public Task<IActionResult> Delete(int id);
    }
}
