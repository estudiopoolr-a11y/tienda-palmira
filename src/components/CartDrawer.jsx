import React from 'react'; // Habilita la sintaxis JSX de este componente.
import { X, ShoppingBag } from 'lucide-react'; // Importa los iconos de cierre y bolsa de compras.
import { CartItem } from './CartItem'; // Importa la fila que permite editar un producto del carrito.
import { formatCOP } from '../utils/formatters'; // Importa el formateador de precios en pesos colombianos.

// Muestra el carrito, sus productos y el resumen de compra.
export const CartDrawer = ({
  isOpen, // Indica si el panel lateral debe mostrarse.
  onClose, // Cierra el panel al pulsar el fondo o el botón de cierre.
  cartItems, // Contiene los productos elegidos por el usuario.
  totalUnidades, // Contiene la suma de todas las cantidades.
  totalPrecio, // Contiene el valor total de la compra.
  onUpdateCantidad, // Actualiza la cantidad de una fila.
  onRequestDelete // Solicita confirmar la eliminación de una fila.
}) => {
  if (!isOpen) return null; // No dibuja el panel cuando está cerrado.

  // El clic en el fondo cierra el panel; el panel interior detiene ese evento.
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title">
            {/* Icono y título identifican el contenido del panel. */}
            <ShoppingBag size={22} />
            <h3>Carrito de Compras</h3>
          </div>
          {/* Este botón ofrece un cierre accesible del panel. */}
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar carrito">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Presenta un estado vacío o la lista de artículos, según el carrito. */}
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} className="empty-icon" />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {/* Usa el identificador del producto como clave estable para React. */}
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateCantidad={onUpdateCantidad}
                  onRequestDelete={onRequestDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* El resumen y la acción de compra solo aparecen si hay artículos. */}
        {cartItems.length > 0 && (
          <div className="drawer-footer">
            {/* Resume el número total de unidades seleccionadas. */}
            <div className="summary-row">
              <span>Total de Unidades:</span>
              <strong>{totalUnidades} u.</strong>
            </div>
            {/* Muestra el precio total formateado como moneda colombiana. */}
            <div className="summary-row total-row">
              <span>Total de la Compra:</span>
              <strong className="total-price">{formatCOP(totalPrecio)}</strong>
            </div>
            {/* Avisa que el pedido se finalizó en esta demostración local. */}
            <button className="btn btn-primary btn-checkout" onClick={() => alert("¡Gracias por su compra en Tienda Palmira!")}>
              Finalizar Pedido
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};