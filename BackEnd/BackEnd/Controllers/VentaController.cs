using BackEnd.Models;
using BackEnd.Models.Request;
using BackEnd.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VentaController : ControllerBase
    {
        [HttpPost]
        public IActionResult Add(VentaRequest request)
        {
            Respuesta respuesta = new Respuesta();

            try
            {
                using (VentaRealContext db = new VentaRealContext())
                {
                    var venta = new Venta();
                    // venta.Total = request.Total;
                    venta.Fecha = DateTime.Now;
                    venta.IdCliente = request.IdCliente;
                    db.Venta.Add(venta);
                    db.SaveChanges();

                    foreach(var Requestconcepto in request.Conceptos)
                    {
                        var concepto = new Models.Concepto(); 
                        concepto.Cantidad = Requestconcepto.Cantidad;
                        concepto.IdProducto = Requestconcepto.IdProducto;  
                        concepto.PrecioUnitario = Requestconcepto.PrecioUnitario;
                        concepto.Importe = Requestconcepto.Importe;
                        concepto.IdVenta = venta.Id; 
                        db.Conceptos.Add(concepto);
                        db.SaveChanges();
                    }
                    respuesta.Exito = 1;
                }
            }
            catch (Exception ex)
            {
                respuesta.Mensaje = ex.Message;
            }
            return Ok(respuesta);
        }
    }
}
