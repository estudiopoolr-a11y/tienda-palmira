import React, { useState } from 'react'; // Importa React y el hook para controlar la cantidad ingresada.
import { Plus, ShoppingCart } from 'lucide-react'; // Importa iconos de interfaz para productos y acciones.
import { formatCOP } from '../utils/formatters'; // Importa el formateador de precios colombianos.

// Muestra un producto, el stock disponible y los controles para agregarlo al carrito.
export const ProductCard = ({ producto, cantidadEnCarrito, onAddToCart, showToast }) => {
  const stockDisponible = producto.stock - cantidadEnCarrito; // Resta del inventario las unidades ya agregadas.
  const isAgregable = stockDisponible > 0; // Indica si todavía puede agregarse alguna unidad.
  const [cantidadInput, setCantidadInput] = useState(1); // Guarda la cantidad seleccionada en el campo.

  // Bloquea letras, notación científica 'e', signos y decimales.
  const handleKeyDown = (e) => {
    if (['e', 'E', '+', '-', '.', ','].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Previene cambios de cantidad mediante el scroll del mouse.
  const handleWheel = (e) => {
    e.target.blur();
  };

  // Solo permite pegar secuencias compuestas enteramente por dígitos.
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pasteData)) {
      e.preventDefault();
    }
  };

  // Valida el valor digitado y lo limita a la cantidad disponible.
  const handleInputChange = (e) => {
    // Lee el texto para admitir temporalmente que el campo quede vacío mientras se edita.
    const valStr = e.target.value;
    if (valStr === '') {
      setCantidadInput('');
      return;
    }

    // Convierte el texto a entero y reemplaza valores inválidos o menores que uno.
    let val = parseInt(valStr, 10);
    if (isNaN(val) || val < 1) {
      val = 1;
    }

    // Impide seleccionar más unidades de las que quedan en bodega.
    if (val > stockDisponible) {
      val = stockDisponible;
      showToast("Este es el máximo de producto disponible en stock");
    }

    setCantidadInput(val);
  };

  // Restaura una cantidad válida si el campo queda vacío al perder el foco.
  const handleBlur = () => {
    if (cantidadInput === '' || cantidadInput < 1) {
      setCantidadInput(1);
    }
  };

  // Envía la cantidad elegida al carrito y restablece el campo a una unidad.
  const handleAdd = () => {
    if (!isAgregable) return;
    // Usa una unidad como alternativa mientras el usuario deja el campo vacío.
    const cantAgregar = typeof cantidadInput === 'number' ? cantidadInput : 1;
    onAddToCart(producto, cantAgregar);
    setCantidadInput(1);
  };

  // Dibuja la información del producto y desactiva controles si no hay inventario.
  return (
    <div className={`product-card ${!isAgregable ? 'out-of-stock' : ''}`}>
      <div className="product-card-body">
        {/* Identifica el artículo e informa su precio y disponibilidad. */}
        <h3 className="product-title">{producto.nombre}</h3>
        <p className="product-price">{formatCOP(producto.precio)}</p>
        <p className="product-stock">
          Stock en bodega: <strong>{producto.stock}</strong> 
          {cantidadEnCarrito > 0 && <span className="in-cart-tag"> ({cantidadEnCarrito} en carrito)</span>}
        </p>

        <div className="product-controls">
          {/* Permite elegir una cantidad dentro del stock restante. */}
          <div className="quantity-field">
            <label htmlFor={`input-prod-${producto.id}`}>Cantidad:</label>
            <input
              id={`input-prod-${producto.id}`}
              type="number"
              min="1"
              max={stockDisponible > 0 ? stockDisponible : 1}
              value={cantidadInput}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onWheel={handleWheel}
              onChange={handleInputChange}
              onBlur={handleBlur}
              disabled={!isAgregable}
            />
          </div>

          {/* Envía el artículo al carrito o informa que no hay stock. */}
          <button
            className="btn btn-primary btn-add"
            onClick={handleAdd}
            disabled={!isAgregable}
          >
            <Plus size={18} /> {isAgregable ? 'Agregar' : 'Sin Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};