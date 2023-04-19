using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WoodenStreet.IServices;
using WoodenStreet.Models;
using WoodenStreet.Services;

namespace WoodenStreet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private IImageService _ImageService { get; set; }

        public ImageController(IImageService imageService)
        {
            _ImageService = imageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductImages()
        {
            return await _ImageService.GetAll();
        }

        //[HttpPost]
        //public async Task<IActionResult> PostImages(Image[] images)
        //{
        //    return await _ImageService.Post(images);
        //}
    }
}
