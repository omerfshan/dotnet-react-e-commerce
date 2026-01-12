using API.Data;
using API.Dto;
using API.Entity;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public CartController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // GET: api/cart
    [HttpGet]
    public async Task<ActionResult<CartDto>> GetCart()
    {
        var cart = await GetOrCreate();

        return _mapper.Map<CartDto>(cart);
    }

    // POST: api/cart?productId=1&quantity=2
    [HttpPost]
    public async Task<ActionResult> AddItemToCart(int productId, int quantity)
    {
        var cart = await GetOrCreate();

        var product = await _context.Products
            .FirstOrDefaultAsync(i => i.Id == productId);

        if (product == null)
            return NotFound();

        cart.AddItem(productId, quantity);

        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            var cartDto = _mapper.Map<CartDto>(cart);
            return CreatedAtAction(nameof(GetCart), cartDto);
        }

        return BadRequest(new ProblemDetails { Title = "The product can not be added to cart" });
    }

    // DELETE: api/cart?productId=1&quantity=1
    [HttpDelete]
    public async Task<IActionResult> DeleteFromCart(int productId, int quantity)
    {
        var cart = await GetOrCreate();

        cart.RemoveItem(productId, quantity);

        var result = await _context.SaveChangesAsync() > 0;

        if (result)
            return Ok();

        return BadRequest(new ProblemDetails { Title = "problem removing item" });
    }

    private async Task<Cart> GetOrCreate()
    {
        var customerId = Request.Cookies["customerId"];

        var cart = await _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.CustomerId == customerId);

        if (cart is null)
        {
            var newCustomerId = Guid.NewGuid().ToString();

            var cookiesOptions = new CookieOptions
            {
                Expires = DateTime.Now.AddMonths(1),
                IsEssential = true
            };

            Response.Cookies.Append("customerId", newCustomerId, cookiesOptions);

            cart = new Cart { CustomerId = newCustomerId };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        return cart;
    }
}
