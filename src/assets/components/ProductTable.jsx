import { Pencil, PlusCircle, Search, Trash } from 'lucide-react';
import  { useEffect, useState } from 'react';
import { Table, Button, Container, Form, InputGroup } from 'react-bootstrap';
import { obtenerProductos } from '../utils/consultas';
// import { PencilFill, TrashFill, PlusCircle, Search } from 'react-bootstrap-icons';

// eslint-disable-next-line react/prop-types
export default function ProductTable({show , setShow, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    obtenerProductos()
    .then( res => setProducts(res.data))
    .catch(err => console.log(err))
  }, [])
  if(!products || products.length <1) return null
  console.log(products);
  
//   const filteredProducts = products.filter(product =>
//   {  if(product.title && searchTerm){
//         product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     }
// }
//   );
  if(!products)return null

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup className="w-50">
          <InputGroup.Text>
            <Search />
          </InputGroup.Text>
          <Form.Control
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Button variant="dark" onClick={() => setShow(!show)} className="d-flex align-items-center gap-2">
          <PlusCircle /> Agregar Producto
        </Button>
      </div>

      <div className="table-responsive">
        <Table hover bordered>
          <thead className="bg-light">
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td style={{ width: '100px' }}>
                  <img
                    src={product.image}
                    alt={product.alt || product.title}
                    className="img-fluid"
                    style={{ maxHeight: '50px', objectFit: 'cover' }}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.amount}</td>
                <td>
                  <span className={`badge ${product.status ? 'bg-success' : 'bg-danger'}`}>
                    {product.status ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>{product.category?.name}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="primary" size="sm" onClick={() => onEdit(product)}>
                      <Pencil />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => onDelete(product._id)}>
                      <Trash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>Mostrando {products.length} de {products.length} productos</span>
      </div>
    </Container>
  );
}

