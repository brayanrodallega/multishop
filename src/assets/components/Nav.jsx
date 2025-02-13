import { ArrowRightEndOnRectangleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import '../animations/style.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppContext } from '../utils/context'
export default function Nav() {
  const {value, setValue} = useAppContext()
  const [productos , setProductos] = useState(!value.user ? [] : JSON.parse(localStorage.getItem('productosCarrito')))
    useEffect(() => {
        const handleStorageChange = () => {
          console.log("disparo el evento");
          
          console.log(value.user);
          if(value){
            
            setProductos(JSON.parse(localStorage.getItem('productosCarrito')) || []);
          }
        };
    
        window.addEventListener('storage', handleStorageChange);
    
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, [!value]);
      const handleLogout = () => {
        setValue(delete value.user)
        setProductos([])
        window.dispatchEvent(new Event('storage'))

      }
  return (
    <nav className=" container-fluid navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
        <a className="navbar-brand" href="#"><h1 className="title">MultyShop
        <div className="aurora">
      <div className="aurora__item"></div>
      <div className="aurora__item"></div>
      <div className="aurora__item"></div>
      <div className="aurora__item"></div>
    </div></h1></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
            <div className="d-flex align-items-center pe-2">
              <Link to='/carrito' className="position-relative">
                <ShoppingCartIcon className="text-white" style={{ width: '24px', height: '24px' }} />
                <span className="position-absolute top-0 start-100  translate-middle badge rounded-pill bg-danger">
                  {productos.length}
                  <span className="visually-hidden">items en el carrito</span>
                </span>
              </Link>
          </div>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>

                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/productos">Productos</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/contacto' >Contacto</Link>
                </li>
                {
                  value.user && value.user.role === 'admin' 
                  ? <li className="nav-item dark:text-red">
                    <Link className="nav-link" to='/dashboard' >dashboard</Link>
                </li>
                : null
                }
                <li className="nav-item">
                    {!value.user
                    ?<Link className="nav-link" to="/login">Login</Link>
                    :<button onClick={handleLogout} className='bg-danger px-2 rounded-1 ms-2' >
                        <ArrowRightEndOnRectangleIcon  className="text-white" style={{ width: '24px', height: '24px' }}/>    
                    </button>}
                </li>
            </ul>
        </div>
    </div>
</nav>
  )
}
