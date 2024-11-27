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
function App() {
  const [value, setValue] = useState({});
  const desktop = [
    {
      src: img1,
      title: "Bienvenido a Tech Gamer Store",
      description: "Preparate para unirte al mundo gamer",
    },
    {
      src: img2,
      title: "Conectaté y se el mejor",
      description: "Un mundo entero espera por ti",
    },
    {
      src: img3,
      title: "Productos de alta calidad",
      description: "Y como nos gusta, al mejor precio",
    },
  ];
  const mobile = [
    {
      src: img1M,
      title: "Bienvenido a Tech Gamer Store",
      description: "Preparate para unirte al mundo gamer",
    },
    {
      src: img2M,
      title: "Conectaté y se el mejor",
      description: "Un mundo entero espera por ti",
    },
    {
      src: img3M,
      title: "Productos de alta calidad",
      description: "Y como nos gusta, al mejor precio",
    },
  ];
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
                  title={"Bienvenido"}
                  imagePosition="left"
                  description={
                    "Sunt dolore e iusmod voluptate eiusmod ad sint duis qui dolor in. Mollit nulla nisi tempor velit eiusmod velit cupidatat. Cupidatat exercitation proident dolore deserunt aute ipsum do sint adipisicing do. Fugiat labore adipisicing ipsum anim cillum tempor incididunt."
                  }
                />

                <HienBowl
                  image={png2}
                  title={"Bienvenido"}
                  imagePosition="right"
                  description={
                    "Sunt dolore e iusmod voluptate eiusmod ad sint duis qui dolor in. Mollit nulla nisi tempor velit eiusmod velit cupidatat. Cupidatat exercitation proident dolore deserunt aute ipsum do sint adipisicing do. Fugiat labore adipisicing ipsum anim cillum tempor incididunt."
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
        </Routes>
        <Routes path="/dashboard" element={<main>
          <ProductTable />

        </main>} />
      </div>
    </MyContext.Provider>
  );
}

export default App;
