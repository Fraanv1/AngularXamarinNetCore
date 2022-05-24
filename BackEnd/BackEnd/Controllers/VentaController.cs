using BackEnd.Models;
using BackEnd.Models.Request;
using BackEnd.Models.Response;
using BackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VentaController : ControllerBase
    {
        private IVentaService _IventaService;

        public VentaController(IVentaService ventaService)
        {
            this._IventaService = ventaService;
        }

        [HttpPost]
        public IActionResult Add(VentaRequest request)
        {
            Respuesta respuesta = new Respuesta();

            try
            {
                _IventaService.Add(request);
                respuesta.Exito = 1;
            }
            catch (Exception ex)
            {
                respuesta.Mensaje = ex.Message;
            }
            return Ok(respuesta);
        }
    }
}
