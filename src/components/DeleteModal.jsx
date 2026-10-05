import React from 'react'; // Habilita la sintaxis JSX de este componente.
import { AlertCircle, Trash2, X } from 'lucide-react'; // Importa los iconos de advertencia, eliminar y cerrar.

// Solicita confirmar antes de quitar un producto del carrito.
export const DeleteModal = ({ isOpen, item, onConfirm, onCancel }) => {
  if (!isOpen || !item) return null; // Evita mostrar el diálogo sin un producto que eliminar.

  // Presenta el nombre del producto y las dos opciones de decisión.
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          {/* Señala que se trata de una acción que requiere confirmación. */}
          <AlertCircle size={24} className="text-warning" />
          <h3>Confirmar eliminación</h3>
          {/* Permite cancelar el diálogo desde su encabezado. */}
          <button className="icon-btn" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          {/* Informa al usuario cuál producto está a punto de eliminar. */}
          <p>Esta es la cantidad mínima, ¿desea eliminar el producto <strong>"{item.nombre}"</strong>?</p>
        </div>
        <div className="modal-actions">
          {/* Cancela la eliminación y cierra el diálogo. */}
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          {/* Confirma la acción enviando el identificador del producto. */}
          <button className="btn btn-danger" onClick={() => onConfirm(item.id)}>
            <Trash2 size={16} /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};