import React from 'react'; // Habilita la sintaxis JSX de este componente.
import { ProductCard } from './ProductCard'; // Importa la tarjeta para representar cada producto.

// Presenta el catálogo y calcula la cantidad de cada producto que ya está en el carrito.
export const Catalog = ({ productos, cartItems, onAddToCart, showToast }) => {
  return (
    <main className="catalog-container">
      {/* Título principal de la sección de productos. */}
      <h2 className="section-title">Nuestros Productos Típicos</h2>
      <div className="product-grid">
        {/* Crea una tarjeta para cada producto disponible. */}
        {productos.map((prod) => {
          // Busca cuántas unidades de este producto ya están guardadas en el carrito.
          const cartItem = cartItems.find((item) => item.id === prod.id);
          // Usa cero si el producto todavía no fue agregado al carrito.
          const cantidadEnCarrito = cartItem ? cartItem.cantidad : 0;

          // Envía a la tarjeta los datos del producto y las acciones disponibles.
          return (
            <ProductCard
              key={prod.id}
              producto={prod}
              cantidadEnCarrito={cantidadEnCarrito}
              onAddToCart={onAddToCart}
              showToast={showToast}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Catalog;