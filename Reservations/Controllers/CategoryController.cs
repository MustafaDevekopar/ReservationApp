using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservations.Data;
using Reservations.Dto;
using Reservations.Interfaces;
using Reservations.Models;
using Reservations.Repository;

namespace Reservations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        public CategoryController(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var categories = _mapper.Map<List<CategoryDto>>
                ( await _categoryRepository.GetCategoriesAsync());

            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            return Ok(categories);
        }

        [HttpGet("{categoryId}")]
        public async Task<IActionResult> GetById(int categoryId)
        {
            if (!_categoryRepository.CategoriesExists(categoryId))
                return NotFound(ModelState);

            var category = _mapper.Map<CategoryDto>
                (await _categoryRepository.GetCategoryAsync(categoryId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(category);
        }
        [HttpGet("categoryName/{name}")]
        public async Task<IActionResult> GetCategoryByName(string name)
        {
            var category = await _categoryRepository.GetCategoryByNameAsync(name);

            if (category == null)
                return NotFound(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(category);

        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryDto CategoryCreate)
        {
            if (CategoryCreate == null)
                return BadRequest(ModelState);

            var category = await _categoryRepository.GetCategoryByNameAsync(CategoryCreate.Name);

            if (category != null)
            {
                ModelState.AddModelError("", "Category already exists");
                return StatusCode(422, ModelState);
            }

            var categoryMap = _mapper.Map<Category>(CategoryCreate);
            if (!_categoryRepository.CreateCategory(categoryMap))
            {
                ModelState.AddModelError("", "Something woring while savin");
                return BadRequest(ModelState);
            }
            return Ok("Successfully Created");
        }

        [HttpPut("{categoryId}")]
        public IActionResult UpdateCategory(int categoryId, [FromBody] CategoryDto updateCategory)
        {
            if (updateCategory == null)
                return BadRequest();

            if (categoryId != updateCategory.Id)
                return BadRequest(ModelState);

            if (!_categoryRepository.CategoriesExists(categoryId))
                return NotFound(ModelState);

            if (!ModelState.IsValid)
                return BadRequest();

            var categoryMap = _mapper.Map<Category>(updateCategory);

            if (!_categoryRepository.UpdateCategory(categoryMap))
            {
                ModelState.AddModelError("", "Somthing went woring while updating");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{categoryId}")]
        public async Task<IActionResult> DeleteCategory(int categoryId)
        {
            if (!_categoryRepository.CategoriesExists(categoryId))
                return NotFound();

            var categoryToDelete = await _categoryRepository.GetCategoryAsync(categoryId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_categoryRepository.DeleteCategory(categoryToDelete))
                ModelState.AddModelError("", "Something went wring deleting");

            return NoContent();

        }
    }
}
