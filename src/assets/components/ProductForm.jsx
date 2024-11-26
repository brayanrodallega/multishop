import { useState, useEffect } from 'react';
import '../styles/ProductForm.css'

const ProductForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        status: false,
        price: '',
        amount: '',
        category: '',
    });

    const [categories, setCategories] = useState([]); // Estado para las categorías
    const [loading, setLoading] = useState(true); // Estado de carga para las categorías

    // Función para obtener categorías desde la API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://multishopapi.onrender.com/api/categorias');
                const data = await response.json();

                // Verificamos si el estado de la respuesta es 200 y si hay categorías
                if (data.status === 200 && data.data) {
                    setCategories(data.data); // Almacena las categorías en el estado
                } else {
                    console.error('No se encontraron categorías');
                }
                setLoading(false); // Establece el estado de carga en falso
            } catch (error) {
                console.error('Error al cargar las categorías:', error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos al servidor o realizar alguna acción con ellos.
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="image">Image</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="status">Status</label>
                <input
                    type="checkbox"
                    id="status"
                    name="status"
                    checked={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="amount">Amount</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="category">Category</label>
                {loading ? (
                    <p>Loading categories...</p>
                ) : (
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;
