
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Banner from "./assets/components/Banner";
import FormContact from "./assets/components/FormContact";
import Nav from "./assets/components/Nav";
import img1 from "./assets/images/desktop/img1.jpg";
import img2 from "./assets/images/desktop/img2.jpg";
import img3 from "./assets/images/desktop/img3.jpg";
import img2M from "./assets/images/mobile/img2.jpg";
import img1M from "./assets/images/mobile/img1.jpg";
import img3M from "./assets/images/mobile/img3.jpg";
import png1 from "./assets/images/png/tienda-1-8.png";
import png2 from "./assets/images/png/tienda-2-8.png";
import GalleryProducts from "./assets/components/GalleryProducts";
import Login from "./assets/components/Login";
import Register from "./assets/components/Register";
import Table from "./assets/components/TableCarrito";
import HienBowl from "./assets/components/HienBolw";
import { MyContext } from "./assets/utils/context";
import { useState } from "react";
import ProductTable from "./assets/components/ProductTable";
import ProductForm from "./assets/components/ProductForm";
import { registrarProductos } from "./assets/utils/consultas";

function App() {
  const [value, setValue] = useState({});
  const [show, setShow] = useState(false);
  const desktop = [
    {
      src: img1,
      title: "La mejor logistica",
      description: "al alcance de tus manos",
    },
    {
      src: img2,
      title: "Compras virtuales",
      description: "completamente seguras",
    },
    {
      src: img3,
      title: "Hazlo mientra te diviertes",
      description: "no hay nada mejor",
    },
  ];
  const mobile = [
    {
      src: img1M,
      title: "La mejor logistica",
      description: "al alcance de tus manos",
    },
    {
      src: img2M,
      title: "Compras virtuales",
      description: "completamente seguras",
    },
    {
      src: img3M,
     title: "Hazlo mientra te diviertes",
      description: "no hay nada mejor",
    },
  ];
  const handleSubmit = (formData) => {
    registrarProductos(formData,value.user.token)
        .then(response => {
            console.log('Producto registrado:', response);
            // Aquí puedes manejar la respuesta, por ejemplo, cerrar el modal, actualizar la lista de productos, etc.
        })
        .catch(error => {
            console.error('Error al registrar el producto:', error);
            // Manejo de errores
        });
};
  return (
    <MyContext.Provider value={{ value, setValue }}>
      <div className="flex-column justify-content-center main">
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Banner desktopImages={desktop} mobileImages={mobile} />
                <HienBowl
                  image={png1}
                  title={"Descubre la diversión al comprar"}
                  imagePosition="left"
                  description={
                    "En MultyShop, creemos que las compras deben ser más que una simple transacción: ¡deben ser una experiencia emocionante! Explora nuestra selección de productos cuidadosamente elegidos, encuentra ofertas increíbles y disfruta de una atención al cliente excepcional. Nos esforzamos para que cada compra sea un momento único, lleno de sorpresas y satisfacción."
                  }
                />

                <HienBowl
                  image={png2}
                  title={"Impulsa tu negocio con nosotros"}
                  imagePosition="right"
                  description={
                    "En el mundo de la logística, cada minuto cuenta y cada entrega marca la diferencia. En MultyShop, entendemos que el éxito de tu negocio depende de un flujo eficiente y confiable. Por eso, te ofrecemos soluciones logísticas diseñadas para optimizar tus operaciones, reducir costos y garantizar que tus productos lleguen a su destino en perfectas condiciones y a tiempo."
                  }
                />
              </main>
            }
          />
          <Route
            path="/productos"
            element={
              <main>
                <GalleryProducts />
              </main>
            }
          />
          <Route
            path="/contacto"
            element={
              <main>
                <FormContact />
              </main>
            }
          />
          <Route
            path="/login"
            element={
              <main>
                <Login />
              </main>
            }
          />
          <Route
            path="/register"
            element={
              <main>
                <Register />
              </main>
            }
          />

          <Route
            path="/carrito"
            element={
              <main>
                <Table />
              </main>
            }
          />
        <Route path="/dashboard" element={<main>
          <ProductForm onSubmit={handleSubmit} show={show} onHide={() => setShow(false)}/>

          <ProductTable setShow={e => setShow(e)} show={show}/>
          </main>} />
        </Routes>
      </div>
    </MyContext.Provider>
  );
}

export default App;
