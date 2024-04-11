using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Data;
using Reservations.Interfaces;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository )
        {
            _categoryRepository = categoryRepository;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var categories = await _categoryRepository.GetCategoriesAsync();

            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            return Ok(categories);
        }
        [HttpGet("{categoryId}")]
        public async Task<IActionResult> GetById(int categoryId)
        {
            if (!_categoryRepository.CategoriesExists(categoryId))
                return NotFound(ModelState);

            var category = await _categoryRepository.GetCategoryAsync(categoryId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(category);
        }


    }
}
