using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models.Request
{
    public class VentaRequest
    {
        [Required]
        [Range (1, double.MaxValue, ErrorMessage ="El valor del idCliente debe ser mayor a 0")]
        public int IdCliente { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "Deben existir conceptos")]
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
