using BackEnd.Models.Request;

namespace BackEnd.Services
{
    public interface IVentaService
    {
        public void Add(VentaRequest request);
    }
}
