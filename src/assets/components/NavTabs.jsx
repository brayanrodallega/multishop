/* eslint-disable react/prop-types */
import { data } from "../utils/data";

export default function NavTabs({setTab}) {
    // convierte el obj a un array
    const productos = Object.entries(data); 

// Mapear el array
  return (
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            {
                productos.map(([clave, valor]) => (
                    <li key={clave} className="nav-item" role="presentation">
                <button onClick={() => setTab(valor)} className="nav-link active" id="portatiles-tab" data-bs-toggle="tab" data-bs-target="#portatiles" type="button" role="tab" aria-controls="portatiles" aria-selected="true">{clave}</button>
            </li>
                ))
            }
           
        </ul>
  )
}
