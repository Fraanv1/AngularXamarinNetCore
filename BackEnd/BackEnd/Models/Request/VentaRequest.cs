using System.Collections.Generic;

namespace BackEnd.Models.Request
{
    public class VentaRequest
    {
        public int IdCliente { get; set; }
        public decimal Total { get; set; }
        public List<Concepto> Conceptos { get; set; }

        public VentaRequest()
        {
            this.Conceptos = new List<Concepto>();
        }
    }

    public class ConceptoRequest
    {
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Importe { get; set; }
        public int IdProducto { get; set; }
    }
}
