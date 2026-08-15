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
            await roleManager.CreateAsync(new ApplicationRole { Name = "Worker" });
        }
        else if (!await roleManager.RoleExistsAsync("Worker"))
        {
            await roleManager.CreateAsync(new ApplicationRole { Name = "Worker" });
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

        if (await userManager.FindByEmailAsync("can.demir@gmail.com") == null)
        {
            var worker = new ApplicationUser
            {
                FirstName = "Can",
                LastName = "Demir",
                UserName = "candemir",
                Email = "can.demir@gmail.com"
            };

            var result = await userManager.CreateAsync(worker, "Worker@2024");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(worker, "Worker");
            }
        }
    }
}