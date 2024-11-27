
// import { useState, useEffect } from 'react';
// import '../styles/ProductForm.css'

// const ProductForm = () => {
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         image: '',
//         status: false,
//         price: '',
//         amount: '',
//         category: '',
//     });

//     const [categories, setCategories] = useState([]); // Estado para las categorías
//     const [loading, setLoading] = useState(true); // Estado de carga para las categorías

//     // Función para obtener categorías desde la API
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch('https://multishopapi.onrender.com/api/categorias');
//                 const data = await response.json();

//                 // Verificamos si el estado de la respuesta es 200 y si hay categorías
//                 if (data.status === 200 && data.data) {
//                     setCategories(data.data); // Almacena las categorías en el estado
//                 } else {
//                     console.error('No se encontraron categorías');
//                 }
//                 setLoading(false); // Establece el estado de carga en falso
//             } catch (error) {
//                 console.error('Error al cargar las categorías:', error);
//                 setLoading(false);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Aquí puedes enviar los datos al servidor o realizar alguna acción con ellos.
//         console.log(formData);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="title">Title</label>
//                 <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="description">Description</label>
//                 <textarea
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="image">Image</label>
//                 <input
//                     type="text"
//                     id="image"
//                     name="image"
//                     value={formData.image}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="status">Status</label>
//                 <input
//                     type="checkbox"
//                     id="status"
//                     name="status"
//                     checked={formData.status}
//                     onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="price">Price</label>
//                 <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="amount">Amount</label>
//                 <input
//                     type="number"
//                     id="amount"
//                     name="amount"
//                     value={formData.amount}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="category">Category</label>
//                 {loading ? (
//                     <p>Loading categories...</p>
//                 ) : (
//                     <select
//                         id="category"
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Select a category</option>
//                         {categories.map((category) => (
//                             <option key={category._id} value={category._id}>
//                                 {category.name}
//                             </option>
//                         ))}
//                     </select>
//                 )}
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     );
// };


import { CloudUpload } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Modal, Form, Button,} from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
export default function ProductForm({ show, onHide, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    status: false,
    alt: '',
    link: '',
    price: '',
    amount: '',
    category: ''
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPreview(initialData.image);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    if (file) {
      form.append('file', file);
    }
    onSubmit(form);
    onHide();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview('');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Editar' : 'Agregar'} Producto</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Título*</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Categoría*</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {/* Add your categories here */}
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Descripción*</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Imagen del Producto*</Form.Label>
                <div 
                  className="d-flex flex-column align-items-center justify-content-center p-4 border rounded cursor-pointer"
                  onClick={triggerFileInput}
                  style={{
                    height: '200px',
                    background: preview ? `url(${preview}) no-repeat center/cover` : '#f8f9fa',
                    cursor: 'pointer'
                  }}
                >
                  {!preview && (
                    <>
                      <CloudUpload size={48} className="mb-2" />
                      <p className="text-muted mb-0">Haz clic para subir una imagen</p>
                    </>
                  )}
                  <Form.Control
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="d-none"
                    accept="image/*"
                  />
                </div>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Texto Alternativo</Form.Label>
                <Form.Control
                  type="text"
                  name="alt"
                  value={formData.alt}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Precio*</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Cantidad*</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="status"
              name="status"
              label="Producto activo"
              checked={formData.status}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Actualizar' : 'Crear'} Producto
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}


