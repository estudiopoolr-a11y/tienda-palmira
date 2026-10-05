import React from 'react'; // Habilita la sintaxis JSX de este componente.
import { Plus, Minus, Trash2 } from 'lucide-react'; // Importa iconos para sumar, restar y eliminar unidades.
import { formatCOP } from '../utils/formatters'; // Importa el formateador de precios colombianos.

// Representa un artículo del carrito y sus controles de cantidad.
export const CartItem = ({
  item, // Contiene los datos del producto y la cantidad elegida.
  onUpdateCantidad, // Actualiza la cantidad de este producto en el carrito.
  onRequestDelete, // Solicita confirmación para eliminar el producto.
  showToast // Muestra avisos temporales, por ejemplo, cuando se alcanza el stock.
}) => {
  // Impide que el campo acepte letras, signos o valores decimales con el teclado.
  const handleKeyDown = (e) => {
    if (['e', 'E', '+', '-', '.', ','].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Permite pegar solo un texto compuesto enteramente por dígitos.
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pasteData)) {
      e.preventDefault();
    }
  };

  // Quita el foco al desplazar la rueda para evitar cambios accidentales del número.
  const handleWheel = (e) => {
    e.target.blur();
  };

  // Valida el valor escrito antes de actualizar el carrito.
  const handleInputChange = (e) => {
    // Lee el texto porque un campo numérico puede estar temporalmente vacío.
    const valStr = e.target.value;
    if (valStr === '') return;

    // Convierte el texto a entero y solicita eliminar si la cantidad no es positiva.
    let val = parseInt(valStr, 10);
    if (isNaN(val) || val <= 0) {
      onRequestDelete(item);
      return;
    }

    // Limita la cantidad al inventario y avisa al usuario si excede el stock.
    if (val > item.stock) {
      val = item.stock;
      showToast("Este es el máximo de producto disponible en stock");
    }

    onUpdateCantidad(item.id, val);
  };

  // Aumenta la cantidad en una unidad si todavía hay inventario.
  const handleIncrement = () => {
    if (item.cantidad >= item.stock) {
      showToast("Este es el máximo de producto disponible en stock");
      return;
    }
    onUpdateCantidad(item.id, item.cantidad + 1);
  };

  // Disminuye una unidad o solicita eliminar si ya se alcanzó el mínimo.
  const handleDecrement = () => {
    if (item.cantidad <= 1) {
      onRequestDelete(item);
      return;
    }
    onUpdateCantidad(item.id, item.cantidad - 1);
  };

  // Calcula el precio de todas las unidades de este artículo.
  const subtotal = item.precio * item.cantidad;

  // Dibuja los datos del producto y las acciones para gestionar su cantidad.
  return (
    <div className="cart-item-row">
      <div className="cart-item-info">
        {/* Muestra el nombre del producto y su precio por unidad. */}
        <h4 className="cart-item-title">{item.nombre}</h4>
        <p className="cart-item-price">{formatCOP(item.precio)} c/u</p>
      </div>

      <div className="cart-item-controls">
        <div className="quantity-stepper">
          {/* El botón resta una unidad o abre la confirmación de eliminación. */}
          <button 
            type="button"
            className="stepper-btn" 
            onClick={handleDecrement}
            aria-label="Disminuir cantidad"
          >
            <Minus size={14} />
          </button>
          {/* El campo numérico valida teclado, pegado, scroll y cambios manuales. */}
          <input
            type="number"
            className="stepper-input"
            value={item.cantidad}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onWheel={handleWheel}
            onChange={handleInputChange}
          />
          {/* El botón suma una unidad sin superar el stock disponible. */}
          <button 
            type="button"
            className="stepper-btn" 
            onClick={handleIncrement}
            aria-label="Aumentar cantidad"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Presenta el subtotal de este producto en moneda colombiana. */}
        <div className="cart-item-subtotal">
          <span>{formatCOP(subtotal)}</span>
        </div>

        {/* Ofrece eliminar el producto directamente tras la confirmación correspondiente. */}
        <button
          type="button"
          className="icon-btn text-danger"
          onClick={() => onRequestDelete(item)}
          title="Eliminar producto"
          aria-label="Eliminar producto"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};