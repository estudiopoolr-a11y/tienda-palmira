import React from 'react' // Importa React para utilizar su modo estricto.
import ReactDOM from 'react-dom/client' // Importa la API de React para renderizar en el navegador.
import App from './App.jsx' // Importa el componente que contiene la aplicación.
import './index.css' // Carga los estilos globales de la tienda.

// Busca el elemento raíz del HTML y monta la aplicación de React dentro de él.
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode ayuda a detectar problemas durante el desarrollo.
  <React.StrictMode>
    {/* Presenta el componente principal de la tienda. */}
    <App />
  </React.StrictMode>,
) // Cierra el montaje de React.