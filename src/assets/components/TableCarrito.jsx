import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function Table() {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem('productosCarrito')) || []
  );
  const [isPayPalReady, setIsPayPalReady] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const discount = 0.20;
  const clientId = 'AVlBrTuVr6wxEw869imS021x8s3oT1AM0jtdkvUs4pnfFDrNNCe3H3oIo_imsiso-1C29wJy5ja6iGVR';

  useEffect(() => {
    if (!window.paypal) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => setIsPayPalReady(true);
      document.body.appendChild(script);
    } else {
      setIsPayPalReady(true);
    }
  }, [clientId]);

  const updateQuantity = (id, newQuantity) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, cantidad: Math.max(1, newQuantity) }
          : product
      )
    );
  };

  const removeProduct = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    localStorage.setItem('productosCarrito', JSON.stringify(newProducts));
    window.dispatchEvent(new Event('storage'));
  };

  const calculateTotal = () => {
    return products.reduce((sum, product) => sum + product.precio * product.cantidad, 0);
  };

  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscount = () => {
    if (discountCode === "FB2024") {
      setDiscountApplied(true);
    } else {
      alert("Código de descuento inválido");
      setDiscountApplied(false);
    }
  };

  const total = calculateTotal();
  const finalTotal = discountApplied ? (total * (1 - discount)).toFixed(2) : total.toFixed(2);

  useEffect(() => {
    if (isPayPalReady && products.length > 0) {
      const paypalContainer = document.getElementById('paypal-button-container');
      if (paypalContainer) {
        paypalContainer.innerHTML = '';
      }

      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: finalTotal },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Pago completado por ${details.name.given_name}`);
          });
        },
        onError: (err) => {
          console.error('Error al procesar el pago:', err);
        },
      }).render('#paypal-button-container');
    }
  }, [isPayPalReady, finalTotal]);

  if (!products || products.length === 0) {
    return <div>No hay productos</div>;
  }

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
                    style={{ width: '60px' }}
                    value={product.cantidad}
                    onChange={(e) =>
                      updateQuantity(product.id, parseInt(e.target.value))
                    }
                    min="1"
                  />
                </td>
                <td>${(product.precio * product.cantidad).toFixed(2)} USD</td>
                <td>
                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={() => removeProduct(product.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <label>Código de descuento:</label>
        <input
          id="codDes"
          type="text"
          value={discountCode}
          onChange={handleDiscountChange}
          className="form-control"
        />
        <button onClick={applyDiscount} className="btn btn-primary mt-2">
          Aplicar cupón
        </button>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-warning">Continuar comprando</button>
        <div className="text-end">
          {discountApplied && (
            <div className="text-danger original-price">
              Antes: ${total.toFixed(2)} USD
            </div>
          )}
          <h4>Total ${finalTotal} USD</h4>
          <div id="paypal-button-container"></div>
        </div>
      </div>
    </div>
  );
}
