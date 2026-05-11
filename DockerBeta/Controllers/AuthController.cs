using DockerBeta.Common;
using DockerBeta.DTOs;
using DockerBeta.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DockerBeta.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("sign-up")]
    public async Task<ActionResult<ApiResponse<string>>> SignUp([FromBody] UserSignUpDto signUpDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ApiResponse<string>.ErrorResponse("Invalid input data"));
        }

        var result = await _authService.SignUpAsync(signUpDto);

        if (!result.Success)
        {
            return BadRequest(result);
        }

        return Ok(result);
    }

    [HttpPost("sign-in")]
    public async Task<ActionResult<ApiResponse<string>>> SignIn([FromBody] UserSignInDto signInDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ApiResponse<string>.ErrorResponse("Invalid input data"));
        }

        var result = await _authService.SignInAsync(signInDto);

        if (!result.Success)
        {
            return Unauthorized(result);
        }

        return Ok(result);
    }
}
