import { useEffect } from "react";

const usePayPalScript = (clientId) => {
  useEffect(() => {
    if (!window.paypal) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [clientId]);
};

export default usePayPalScript;
