import React, { useState, useMemo } from 'react'; // Importa React y los hooks para guardar estado y calcular valores derivados.
import { PRODUCTOS_INICIALES } from './data/productos'; // Obtiene el catálogo inicial que se muestra en la tienda.
import { Navbar } from './components/Navbar'; // Importa la barra superior con el acceso al carrito.
import { Catalog } from './components/Catalog'; // Importa la cuadrícula de productos disponibles.
import { CartDrawer } from './components/CartDrawer'; // Importa el panel lateral que muestra el carrito.
import { ToastNotification } from './components/ToastNotification'; // Importa los mensajes temporales para el usuario.
import { DeleteModal } from './components/DeleteModal'; // Importa el diálogo que confirma la eliminación de productos.

export function App() {
  const [productos] = useState(PRODUCTOS_INICIALES); // Conserva los productos iniciales durante la vida de la aplicación.
  const [cartItems, setCartItems] = useState([]); // Guarda los productos y cantidades que el usuario agregó al carrito.
  const [isCartOpen, setIsCartOpen] = useState(false); // Controla si el panel del carrito está visible.
  const [toast, setToast] = useState(null); // Guarda el aviso actual o null cuando no hay ningún aviso.
  const [itemToDelete, setItemToDelete] = useState(null); // Guarda el producto pendiente de confirmación para eliminar.

  // Crea un aviso nuevo con su tipo y un identificador único basado en la hora actual.
  const showToast = (message, type = 'warning') => {
    setToast({ message, type, id: Date.now() });
  };

  // Oculta el aviso actual al pulsar cerrar o al terminar su temporizador.
  const handleCloseToast = () => {
    setToast(null);
  };

  // Calcula las unidades y el precio del carrito, repitiendo el cálculo solo cuando cambian sus elementos.
  const { totalUnidades, totalPrecio } = useMemo(() => {
    // Acumula la cantidad y el subtotal de cada producto del carrito.
    return cartItems.reduce(
      (acc, item) => {
        acc.totalUnidades += item.cantidad;
        acc.totalPrecio += item.precio * item.cantidad;
        return acc;
      },
      { totalUnidades: 0, totalPrecio: 0 }
    );
  }, [cartItems]);

  // Agrega un producto o aumenta su cantidad, manteniendo una sola fila y respetando el inventario.
  const handleAddToCart = (producto, cantidadDeseada) => {
    // Usa el estado más reciente para evitar cálculos basados en una versión antigua del carrito.
    setCartItems((prevItems) => {
      // Busca si el producto ya estaba agregado.
      const existingItem = prevItems.find((i) => i.id === producto.id);
      // Toma la cantidad actual o cero si el producto todavía no está en el carrito.
      const cantidadActual = existingItem ? existingItem.cantidad : 0;
      // Suma la cantidad solicitada a la cantidad ya agregada.
      let nuevaCantidadTotal = cantidadActual + cantidadDeseada;

      // Limita la cantidad solicitada a las unidades disponibles.
      if (nuevaCantidadTotal > producto.stock) {
        nuevaCantidadTotal = producto.stock;
        showToast("Este es el máximo de producto disponible en stock");
      }

      // Si ya existe, actualiza solo esa fila para no duplicar el producto.
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === producto.id ? { ...i, cantidad: nuevaCantidadTotal } : i
        );
      } else {
        // Si es la primera vez, agrega al carrito los datos que requiere su interfaz.
        return [
          ...prevItems,
          {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock,
            cantidad: nuevaCantidadTotal
          }
        ];
      }
    });
  };

  // Actualiza la cantidad de una fila del carrito sin modificar los demás productos.
  const handleUpdateCantidad = (id, nuevaCantidad) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        // Aplica el cambio solo al producto cuyo identificador coincide.
        if (item.id === id) {
          let cant = nuevaCantidad;
          // Evita que la cantidad del carrito supere el inventario guardado en ese producto.
          if (cant > item.stock) {
            cant = item.stock;
            showToast("Este es el máximo de producto disponible en stock");
          }
          return { ...item, cantidad: cant };
        }
        return item;
      })
    );
  };

  // Abre la confirmación y conserva los datos del producto seleccionado.
  const handleRequestDelete = (item) => {
    setItemToDelete(item);
  };

  // Elimina el producto confirmado y cierra la confirmación.
  const handleConfirmDelete = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    setItemToDelete(null);
  };

  // Renderiza la página y conecta los datos y acciones con cada componente.
  return (
    <div className="app-layout">
      {/* La barra muestra las unidades totales y permite abrir el carrito. */}
      <Navbar
        totalItems={totalUnidades}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* El catálogo recibe inventario y acciones para agregar productos. */}
      <Catalog
        productos={productos}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        showToast={showToast}
      />

      {/* El panel recibe el contenido, los totales y las acciones de edición. */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        totalUnidades={totalUnidades}
        totalPrecio={totalPrecio}
        onUpdateCantidad={handleUpdateCantidad}
        onRequestDelete={handleRequestDelete}
        showToast={showToast}
      />

      {/* El aviso aparece solo cuando hay un mensaje activo. */}
      <ToastNotification toast={toast} onClose={handleCloseToast} />

      {/* El diálogo aparece cuando hay un producto pendiente de confirmación. */}
      <DeleteModal
        isOpen={!!itemToDelete}
        item={itemToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
}

export default App; // Permite importar App como exportación predeterminada.