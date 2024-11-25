import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function Register() {
    const navigate = useNavigate()
const handleSubmit = (e) => {
    e.preventDefault()

    let name = document.querySelector('#name').value
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value

    let Users = JSON.parse(localStorage.getItem('users')) || []
    let isUserRegistered = Users.find(user => user.email === email)

    if(isUserRegistered) {
        Swal.fire({
            icon: 'error',
            title: 'Error de datos',
            text: 'El correo ya se encuentra en uso, usa otro diferente'
        })
        return
    }
    Users.push({name, email, password})
    localStorage.setItem('users' , JSON.stringify(Users))
    Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'Tu registro se ha realizado con éxito'
    }).then(() => {
        navigate('/login')
    })
}
  return (
    <div>
      <section>
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} id="signupForm">
            <label>Nombre</label>
            <input type="text" placeholder="..." id="name" required autoFocus />
            <label>Mail</label>
            <input type="email" placeholder="..." id="email" required />
            <label>Contraseña</label>
            <input type="password" placeholder="..." id="password" required />
            <input type="submit" value="Registro"/>
        </form>
        <p>Ya tienes una cuenta? <Link to='/login'>Login</Link></p>
    </section>
    </div>
  )
}
