import { Link, useNavigate } from 'react-router-dom'
import '../styles/Forms.style.css'
import Swal from 'sweetalert2'

export default function Login() {
    const navigate = useNavigate()
const handleSubmit = (e) => {
    e.preventDefault()

    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value

    let Users = JSON.parse(localStorage.getItem('users')) || []
    let validUser = Users.find(user => user.email === email && user.password === password)

    if(!validUser){
        return Swal.fire({
            icon: 'error',
            title: 'Error de Datos',
            text: 'El usuario y/o contraseña son incorrectos'
        })
        
    }
    Swal.fire({
        icon: 'success',
        title: 'Inicio de Sesion Exitoso',
        text: `Bienvenido ${validUser.name}`
    })
    localStorage.setItem('login_success' , true)
    window.dispatchEvent(new Event('storage'))

    navigate('/')}
  return (
    <div>
       <section>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} id="loginForm">
            <label>Mail</label>
            <input type="email" placeholder="..." id="email" required autoFocus />
            <label>Contraseña</label>
            <input type="password" placeholder="..." id="password" required />
            <input type="submit" value="Ingresar" />
        </form>
        <p>¿No tienes una cuenta? <Link to='/register'>¡Regístrate!</Link></p>
     </section>
    </div>
  )
}
