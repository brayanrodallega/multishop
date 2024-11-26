import { useState, useEffect } from 'react';
import Card from './Card';

export default function GalleryProducts() {
  const [value, setValue] = useState([]); // Productos filtrados a mostrar
  const [allProducts, setAllProducts] = useState([]); // Todos los productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [search, setSearch] = useState(''); // Estado del input de búsqueda
  const [activeFilter, setActiveFilter] = useState('Todos'); // Filtro activo

  useEffect(() => {
    const apiURL = 'https://multishopapi.onrender.com/api/productos'; // URL de la API

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
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filteredProducts = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setValue(filteredProducts);
  };

  const handleFilterChange = (category) => {
    setActiveFilter(category);

    if (category === 'Todos') {
      setValue(allProducts); // Mostrar todos los productos si selecciona "Todos"
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
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

        {/* Input de búsqueda */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="form-control"
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* Filtros */}
        <div className="filters d-flex justify-content-center mb-4">
          {['Todos', 'Ropa', 'Accesorio', 'Maquillaje', 'Hogar', 'Tecnología'].map((filter) => (
            <button
              key={filter}
              className={`btn mx-2 ${activeFilter === filter ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Galería de productos */}
        <div className="gallery">
          {value.length > 0 ? (
            value.map((product) => (
              <Card
                key={product._id}
                id={product._id}
                url={product.image}
                title={product.title}
                text={product.description}
                precio={product.price}
              />
            ))
          ) : (
            <p className="text-center">No se encontraron productos.</p>
          )}
        </div>
      </div>
    </>
  );
}
