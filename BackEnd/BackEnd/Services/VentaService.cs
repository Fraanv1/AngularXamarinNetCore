using BackEnd.Models;
using BackEnd.Models.Request;
using System;
using System.Linq;

namespace BackEnd.Services
{
    public class VentaService : IVentaService
    {
        public void Add(VentaRequest request)
        {
            using (VentaRealContext db = new VentaRealContext())
            {
                using (var transaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        var venta = new Venta();
                        venta.Total = request.Conceptos.Sum(d => d.Cantidad * d.PrecioUnitario);
                        venta.Fecha = DateTime.Now;
                        venta.IdCliente = request.IdCliente;
                        db.Venta.Add(venta);
                        db.SaveChanges();

                        foreach (var requestconcepto in request.Conceptos)
                        {
                            var concepto = new Models.Concepto();
                            concepto.Cantidad = requestconcepto.Cantidad;
                            concepto.IdProducto = requestconcepto.IdProducto;
                            concepto.PrecioUnitario = requestconcepto.PrecioUnitario;
                            concepto.Importe = requestconcepto.Importe;
                            concepto.IdVenta = venta.Id;
                            db.Conceptos.Add(concepto);
                            db.SaveChanges();
                        }
                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw new Exception("Ocurrio un error en la inserción");
                    }
                }
            }
        }
    }
}
