import React from 'react'; // Habilita la sintaxis JSX de este componente.
import { ShoppingCart, Store } from 'lucide-react'; // Importa los iconos de carrito y tienda.

// Muestra la marca de la tienda y el botón para abrir el carrito.
export const Navbar = ({ totalItems, onOpenCart }) => {
  return (
    <header className="navbar-fixed">
      <div className="navbar-container">
        <div className="navbar-brand">
          {/* Identidad visual de la tienda. */}
          <Store className="brand-icon" size={28} />
          <h1>TIENDA PALMIRA</h1>
        </div>
        {/* El botón abre el carrito y anuncia su función a tecnologías de asistencia. */}
        <button 
          className="cart-button" 
          onClick={onOpenCart} 
          aria-label="Abrir carrito de compras"
        >
          <ShoppingCart size={24} />
          {/* Muestra el contador solo cuando hay al menos una unidad. */}
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </button>
      </div>
    </header>
  );
};