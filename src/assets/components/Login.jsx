import { Link, useNavigate } from 'react-router-dom';
import '../styles/Forms.style.css';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
      // Consumir la API para obtener los usuarios
      const response = await fetch('https://multishopapi.onrender.com/api/usuario');
      if (!response.ok) throw new Error('Error al cargar los datos de los usuarios');
      
      const { data: users } = await response.json(); // Extraer los usuarios de la respuesta

      // Validar usuario
      const validUser = users.find(user => user.email === email && user.password === password);

      if (!validUser) {
        return Swal.fire({
          icon: 'error',
          title: 'Error de Datos',
          text: 'El usuario y/o contraseña son incorrectos',
        });
      }

      // Mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Inicio de Sesión Exitoso',
        text: `Bienvenido ${validUser.name}`,
      });

      // Guardar sesión en localStorage
      localStorage.setItem('login_success', true);
      window.dispatchEvent(new Event('storage'));

      // Navegar a la página de inicio
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Conexión',
        text: error.message,
      });
    }
  };

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
  );
}
