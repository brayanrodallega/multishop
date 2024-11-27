import { Link, useNavigate } from "react-router-dom";
import "../styles/Forms.style.css";
import Swal from "sweetalert2";
import { useAppContext } from "../utils/context";
import { loguerUsers } from "../utils/consultas";
export default function Login() {
  const { value, setValue } = useAppContext();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    loguerUsers({ username, password })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
              icon: 'success',
              title: 'Inicio de Sesion Exitoso',
              text: `Bienvenido ${res.data.name}`
          })

          setValue({ ...value, user: res.data });
          window.dispatchEvent(new Event("storage"));

          return navigate("/");
        }
        return Swal.fire({
                    icon: 'error',
                    title: 'Error de Datos',
                    text: res.message
                })
      })
      .catch((err) => console.error(err));
  };
  // let Users = JSON.parse(localStorage.getItem('users')) || []
  // let validUser = Users.find(user => user.username === username && user.password === password)

  // if(!validUser){
  //     return Swal.fire({
  //         icon: 'error',
  //         title: 'Error de Datos',
  //         text: 'El usuario y/o contraseña son incorrectos'
  //     })

  // }

  // setValue({...value, user: validUser})
  // localStorage.setItem('login_success' , true)

  return (
    <div>
      <section>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} id="loginForm">
          <label>Username</label>
          <input
            type="username"
            placeholder="..."
            id="username"
            required
            autoFocus
          />
          <label>Contraseña</label>
          <input type="password" placeholder="..." id="password" required />
          <input type="submit" value="Ingresar" />
        </form>
        <p>
          ¿No tienes una cuenta? <Link to="/register">¡Regístrate!</Link>
        </p>
      </section>
    </div>
  );
}
