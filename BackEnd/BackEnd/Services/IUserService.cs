using BackEnd.Models.Request;
using BackEnd.Models.Response;

namespace BackEnd.Services
{
    public interface IUserService
    {
        UserResponse Auth(AuthRequest model);
    }
}
