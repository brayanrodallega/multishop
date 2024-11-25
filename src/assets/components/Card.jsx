import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
export default function Card({id, url, title , text , precio , cantidad = 1}) {
  const navigate = useNavigate()
  const handleAddProducto = () => {
    let user = JSON.parse(localStorage.getItem('login_success')) || false
    console.log(user);
    
if(!user) {
    return Swal.fire({
        icon: 'info',
        title: 'Iniciar Sesion',
        text: 'Debes iniciar sesión para agregar este producto',
        confirmButtonText: 'Ir a Iniciar Sesión',
        showCancelButton: false,
        allowOutsideClick: false
    }).then((result) => {
        if(result.isConfirmed){
          navigate('/login')
        }
    });
}
  const ProductosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || []
  ProductosCarrito.push({id,url, title, text , precio, cantidad})
  localStorage.setItem('productosCarrito', JSON.stringify(ProductosCarrito))
  window.dispatchEvent(new Event('storage'))
  return Swal.fire({
    icon: 'success',
    title: 'Producto Agregado',
    text: 'Tu producto fue agregado'
})
  }
  return (
    <div className="col-lg-4 col-md-6">
            <div className="Card-container">
                <img src={url} className="card-img-top" alt="Teclado Gamer 2" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{text}</p>
                    <button onClick={handleAddProducto} className="btn btn-dark">Agregar al carrito</button>
                </div>
            </div>
    </div>
  )
}
