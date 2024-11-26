import { useState, useEffect } from 'react';
import NavTabs from './NavTabs';
import Card from './Card';

export default function GalleryProducts() {
  const [value, setValue] = useState([]); // Productos filtrados a mostrar
  const [allProducts, setAllProducts] = useState([]); // Todos los productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const apiURL = 'http://localhost:3000/api/productos'; // URL de tu API local

    const fetchProducts = async () => {
      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const result = await response.json();
        setAllProducts(result.data); // Guardar todos los productos desde la API
        setValue(result.data); // Mostrar todos los productos inicialmente
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Terminar la carga
      }
    };

    fetchProducts();
  }, );

  const handleTabChange = (filterCategory) => {
    if (filterCategory === 'Todos') {
      setValue(allProducts); // Mostrar todos los productos si selecciona "Todos"
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.category === filterCategory
      );
      setValue(filteredProducts);
    }
  };

  if (loading) return <p className="text-center">Cargando productos...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <>
      <div className="container py-5">
        <h2 className="text-center mb-5">Nuestros Productos</h2>
        <NavTabs setTab={handleTabChange} />
        <div className="gallery">
          {value.map((product) => (
            <Card
              key={product._id}
              id={product._id}
              url={product.image}
              title={product.title}
              text={product.description}
              precio={product.price}
            />
          ))}
        </div>
      </div>
    </>
  );
}
