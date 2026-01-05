using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

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
        var cart = await GetOrCreate();

        return cart;
    }
    [HttpPost]
    public async Task<ActionResult> AddItemToCart(int productId,int quantity)
    {
        var cart =await GetOrCreate();
        var product=await _context.Products.FirstOrDefaultAsync(i=>i.Id == productId);
        if(product==null)
        return NotFound();
        cart.AddItem(productId,quantity);
        var result=await _context.SaveChangesAsync()>0;
        if (result)
        {
            return CreatedAtAction(nameof(GetCart),cart);
        }
        return BadRequest(new ProblemDetails { Title="The product can not be added to cart"});
    }
    // DELETE: api/cart/{id}
[HttpDelete]
public async Task<IActionResult> DeleteFromCart(int ProductId,int quantity)
{
    var cart = await GetOrCreate();

    cart.RemoveItem(ProductId,quantity);

    _context.Carts.Remove(cart);
    var result= await _context.SaveChangesAsync()>0;
    if(result)
    return Ok();
    return  BadRequest(new ProblemDetails { Title="problem removing item "}) ;
}

    private async Task<Cart> GetOrCreate()
    {
         var cart = await _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.CustomerId == Request.Cookies["customerId"]);
        if(cart is null)
        {
            var customerId=Guid.NewGuid().ToString();
            var CookiesOptions=new CookieOptions
            {
                Expires=DateTime.Now.AddMonths(1),
                IsEssential=true,
            };
            Response.Cookies.Append("customerId",customerId,CookiesOptions);
            cart =new Cart{CustomerId=customerId};
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }
        return cart;
     
        

    
    }
}