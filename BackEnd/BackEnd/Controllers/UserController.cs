﻿using BackEnd.Models.Request;
using BackEnd.Models.Response;
using BackEnd.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Autentificar([FromBody] AuthRequest model)
        {
            Respuesta respuesta = new Respuesta();

            var userresponse = _userService.Auth(model);

            if (userresponse == null)
            {
                respuesta.Exito = 0;
                respuesta.Mensaje = "Usuario o contraseña invalidos";
                return BadRequest(respuesta);
            }

            respuesta.Exito = 1;
            respuesta.Data = userresponse;

            return Ok(respuesta);
        }
    }
}
