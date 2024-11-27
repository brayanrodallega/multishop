import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { registerUsers } from "../utils/consultas";
import { useAppContext } from "../utils/context";


export default function Register() {
    const navigate = useNavigate()
const handleSubmit = (e) => {
    e.preventDefault()

    let name = document.querySelector('#name').value
    let username = document.querySelector('#username').value
    let role = document.querySelector('#role').value
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value
    console.log(role);
    
    registerUsers({name, username, email, password , role,})
    .then(res => {
        console.log(res);
        
        if(res.status === 200){
            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso',
                text: 'Tu registro se ha realizado con éxito'
            }).then(() => {
                navigate('/login')
            })
        }
    })
    .catch(err => console.log(err))

    // let Users = JSON.parse(localStorage.getItem('users')) || []
    // let isUserRegistered = Users.find(user => user.email === email)

    // if(isUserRegistered) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Error de datos',
    //         text: 'El correo ya se encuentra en uso, usa otro diferente'
    //     })
    //     return
    // }
    // Users.push({name, email, password})
    // localStorage.setItem('users' , JSON.stringify(Users))
  
}
  return (
    <div>
      <section>
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} id="signupForm">
            <label>Nombre</label>
            <input type="text" placeholder="Ingrese su nombre" id="name" required />
            <label>Name User</label>
            <input type="text" placeholder="Ingrese el nombre de usuario" id="username" required  />
            <label>Mail</label>
            <input type="email" placeholder="Ingrese su correo" id="email" required />
            <label>Contraseña</label>
            <input type="password" placeholder="..." id="password" required />
            <label>Rol</label>
            <select id="role">
                <option value="admin">Vendedor</option>
                <option value="user" selected>Cliente</option>
            </select>
            <input type="submit" value="Registro"/>
        </form>
        <p>Ya tienes una cuenta? <Link to='/login'>Login</Link></p>
    </section>
    </div>
  )
}
