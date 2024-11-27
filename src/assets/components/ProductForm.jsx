import { CloudUpload } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import {obtenerCategorias} from '../utils/consultas'


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
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPreview(initialData.image);
    }
  }, [initialData]);

  useEffect(() => {
    setLoadingCategories(true);
    setErrorCategories(null);
    obtenerCategorias()
      .then(data => {
        setCategories(data.data);
        setLoadingCategories(false);
      })
      .catch(error => {
        console.error('Error al obtener categorías:', error);
        setErrorCategories('Error al cargar las categorías. Por favor, intente de nuevo.');
        setLoadingCategories(false);
      });
  }, [obtenerCategorias]);

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
                {loadingCategories ? (
                  <div className="d-flex align-items-center">
                    <Spinner animation="border" size="sm" className="me-2" />
                    <span>Cargando categorías...</span>
                  </div>
                ) : errorCategories ? (
                  <div className="text-danger">{errorCategories}</div>
                ) : categories.length === 0 ? (
                  <div>No hay categorías disponibles</div>
                ) : (
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                )}
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

