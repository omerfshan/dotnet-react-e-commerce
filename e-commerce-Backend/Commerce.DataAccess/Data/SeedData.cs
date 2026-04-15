using Commerce.Entity.Identity;
using Microsoft.AspNetCore.Identity;

namespace Commerce.DataAccess;

public static class SeedData
{
    public static async Task SeedAsync(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
    {
        if (!roleManager.Roles.Any())
        {
            await roleManager.CreateAsync(new ApplicationRole { Name = "Customer" });
            await roleManager.CreateAsync(new ApplicationRole { Name = "Admin" });
        }

        if (!userManager.Users.Any())
        {
            var customer = new ApplicationUser
            {
                FirstName = "Ahmet",
                LastName = "Yılmaz",
                UserName = "ahmetyilmaz",
                Email = "ahmet.yilmaz@gmail.com"
            };

            var admin = new ApplicationUser
            {
                FirstName = "Mehmet",
                LastName = "Kaya",
                UserName = "mehmetkaya",
                Email = "mehmet.kaya@gmail.com"
            };

            await userManager.CreateAsync(customer, "Customer@2024");
            await userManager.AddToRoleAsync(customer, "Customer");

            await userManager.CreateAsync(admin, "Admin@2024");
            await userManager.AddToRoleAsync(admin, "Admin");
        }
    }
}