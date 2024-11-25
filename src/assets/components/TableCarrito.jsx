import { useState } from 'react';
import { Trash2 } from 'lucide-react';



export default function Table() {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('productosCarrito')));
console.log(products);
if(!products) return (<div>
    no hay productos
  </div>)
  const updateQuantity = (id, newQuantity) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, cantidad: Math.max(1, newQuantity) } : product
    ));
  };

  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    const newProductos = products.filter(product => product.id !== id)
    localStorage.setItem('productosCarrito' , JSON.stringify(newProductos));
    window.dispatchEvent(new Event('storage'))

  };

  const total = products.reduce((sum, product) => sum + product.precio * product.cantidad, 0);
 
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Carrito de compras</h2>
      <div className="table-responsive">
        <table className="table">
          <thead style={{ backgroundColor: '#e6f2ff' }}>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Sub total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>${product.precio.toFixed(2)} USD</td>
                <td>
                  <input 
                    type="number" 
                    className="form-control" 
                    style={{width: '60px'}} 
                    value={product.cantidad} 
                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                    min="1"
                  />
                </td>
                <td>${(product.precio * product.cantidad).toFixed(2)} USD</td>
                <td>
                  <button className="btn btn-link text-danger p-0" onClick={() => removeProduct(product.id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-warning">Continuar comprando</button>
        <div className="text-end">
          <h4>Total ${total.toFixed(2)} USD</h4>
          <button className="btn btn-success">Pagar</button>
        </div>
      </div>
    </div>
  );
}