import { useForm, ValidationError } from '@formspree/react';
import { useEffect } from 'react';
export default function FormContact() {
  const [state, handleSubmit] = useForm("xrbznreg");
  useEffect(() => {
    const timer = setTimeout(()=>{
    state.succeeded = false;        
    },3000)
    return clearTimeout(timer)
  },[state, state.succeeded])

  if (state.succeeded) {
      return <p className=''>Gracias, mensaje enviado!</p>;
  }
  return (      
    <form className="form-contact" onSubmit={handleSubmit}>
        <div className="title">Contactanos</div>
        <label htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email" 
        name="email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting}>
        Enviar
      </button>
    </form>
  )
}
