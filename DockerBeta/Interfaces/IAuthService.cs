using DockerBeta.Common;
using DockerBeta.DTOs;

namespace DockerBeta.Interfaces;

public interface IAuthService
{
    Task<ApiResponse<string>> SignUpAsync(UserSignUpDto signUpDto);
    Task<ApiResponse<string>> SignInAsync(UserSignInDto signInDto);
}
