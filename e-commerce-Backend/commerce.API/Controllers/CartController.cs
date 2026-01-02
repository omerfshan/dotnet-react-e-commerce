using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly DataContext _context;

    public CartController(DataContext context)
    {
        _context = context;
    }

    // GET: api/cart?customerId=omer
    [HttpGet]
    public async Task<ActionResult<Cart>> GetCart()
    {
        var cart = await _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.CustomerId == Request.Cookies["customerId"]);

        if (cart is null) return NotFound();

        return cart;
    }
    // public async Task<ActionResult<Cart>> GetOrCreate()
    //     {
    //             var cart=await _context.Carts.Include(c => c.CartItems).
    //             ThenInclude(ci => ci.Product).
    //             Where(c => c.CustomerId == Request.Cookies["CustomerId"]).
    //             FirstOrDefaultAsync();
    //             if (cart == null)
    //             {
    //                     var customerId =Guid.NewGuid().ToString();
    //             }
    //     }
}