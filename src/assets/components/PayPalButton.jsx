import React, { useEffect } from "react";
import usePayPalScript from "./usePayPalScript";

const PayPalButton = ({ total, onSuccess, clientId }) => {
  usePayPalScript(clientId);

  useEffect(() => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toFixed(2), // Total en USD
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            if (onSuccess) onSuccess(details); // Llama al callback en caso de éxito
          });
        },
        onError: (err) => {
          console.error("Error al procesar el pago:", err);
        },
      }).render("#paypal-button-container");
    }
  }, [total, onSuccess]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
