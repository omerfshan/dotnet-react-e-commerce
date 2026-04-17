namespace Commerce.Core.Interfaces;

public interface ITokenService
{
    string GenerateToken(string userId, string email, string firstName, string lastName, IList<string> roles);
    string? GetUserId(string token);
    string? GetEmail(string token);
    IList<string> GetRoles(string token);
}