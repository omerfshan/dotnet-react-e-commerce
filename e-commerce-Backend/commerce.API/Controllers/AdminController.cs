using System.Security.Claims;
using Commerce.Core.DTO;
using Commerce.Entity.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace commerce.API.Controllers;

[Authorize(Roles = "Admin,Worker")]
[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public AdminController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet("users")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        var users = await _userManager.Users.ToListAsync();
        var userDtos = new List<UserDto>();

        foreach (var user in users)
        {
            var roles = await _userManager.GetRolesAsync(user);
            userDtos.Add(new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email ?? string.Empty,
                Role = roles.FirstOrDefault() ?? "Customer",
                CreatedAt = user.CreatedAt
            });
        }

        return Ok(userDtos);
    }

    [HttpPost("users")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserByAdminDto dto)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var currentUser = await _userManager.FindByIdAsync(currentUserId!);
        var currentUserRoles = await _userManager.GetRolesAsync(currentUser!);
        var isCurrentAdmin = currentUserRoles.Contains("Admin");

        var roleToAssign = string.IsNullOrEmpty(dto.Role) ? "Customer" : dto.Role;

        if (!isCurrentAdmin && roleToAssign.Equals("Admin", StringComparison.OrdinalIgnoreCase))
        {
            return StatusCode(StatusCodes.Status403Forbidden, "Worker rolündeki kullanıcılar Admin rolünde kullanıcı oluşturamaz.");
        }

        var existingUser = await _userManager.FindByEmailAsync(dto.Email);
        if (existingUser != null)
            return BadRequest("Bu e-posta adresiyle kayıtlı bir kullanıcı zaten var.");

        var user = new ApplicationUser
        {
            UserName = dto.Email,
            Email = dto.Email,
            FirstName = dto.FirstName,
            LastName = dto.LastName
        };

        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            return BadRequest($"Kullanıcı oluşturulamadı: {errors}");
        }

        await _userManager.AddToRoleAsync(user, roleToAssign);

        return Ok(new { message = "Kullanıcı başarıyla oluşturuldu." });
    }

    [HttpDelete("users/{userId}")]
    public async Task<IActionResult> DeleteUser(string userId)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (currentUserId == userId)
            return BadRequest("Kendi hesabınızı silemezsiniz.");

        var targetUser = await _userManager.FindByIdAsync(userId);
        if (targetUser == null) return NotFound("Kullanıcı bulunamadı.");

        var currentUser = await _userManager.FindByIdAsync(currentUserId!);
        var currentUserRoles = await _userManager.GetRolesAsync(currentUser!);
        var isCurrentAdmin = currentUserRoles.Contains("Admin");

        var targetUserRoles = await _userManager.GetRolesAsync(targetUser);
        var isTargetAdmin = targetUserRoles.Contains("Admin");

        // Rule: Admin users cannot be deleted
        if (isTargetAdmin)
        {
            return BadRequest("Admin rolündeki kullanıcılar sistem güvenliği nedeniyle silinemez.");
        }

        var result = await _userManager.DeleteAsync(targetUser);
        if (!result.Succeeded)
            return BadRequest("Kullanıcı silinemedi.");

        return Ok(new { message = "Kullanıcı başarıyla silindi." });
    }
}
