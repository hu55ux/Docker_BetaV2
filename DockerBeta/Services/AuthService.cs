using DockerBeta.Common;
using DockerBeta.DTOs;
using DockerBeta.Entities;
using DockerBeta.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace DockerBeta.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;

    public AuthService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<ApiResponse<string>> SignUpAsync(UserSignUpDto signUpDto)
    {
        var user = new AppUser
        {
            UserName = signUpDto.Username,
            Email = signUpDto.Email
        };

        var result = await _userManager.CreateAsync(user, signUpDto.Password);

        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            return ApiResponse<string>.ErrorResponse(errors);
        }

        return ApiResponse<string>.SuccessResponse("User registered successfully");
    }

    public async Task<ApiResponse<string>> SignInAsync(UserSignInDto signInDto)
    {
        var user = await _userManager.FindByEmailAsync(signInDto.UsernameOrEmail) 
                   ?? await _userManager.FindByNameAsync(signInDto.UsernameOrEmail);

        if (user == null)
        {
            return ApiResponse<string>.ErrorResponse("Invalid username or email");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, signInDto.Password, false);

        if (!result.Succeeded)
        {
            return ApiResponse<string>.ErrorResponse("Invalid password");
        }

        return ApiResponse<string>.SuccessResponse("User signed in successfully");
    }
}
