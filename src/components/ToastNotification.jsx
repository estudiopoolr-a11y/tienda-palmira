import React, { useEffect } from 'react'; // Importa React y el hook para gestionar el temporizador.
import { AlertTriangle, X, Info } from 'lucide-react'; // Importa iconos para el aviso y su botón de cierre.

// Muestra un aviso temporal con su mensaje y una opción para cerrarlo.
export const ToastNotification = ({ toast, onClose }) => {
  // Inicia el autocierre cada vez que aparece o cambia el aviso.
  useEffect(() => {
    if (!toast) return; // No inicia un temporizador si no hay aviso visible.
    const timer = setTimeout(() => {
      onClose(); // Oculta el aviso cuando transcurren cuatro segundos.
    }, 4000); // Autocierre en 4 segundos
    return () => clearTimeout(timer); // Limpia el temporizador anterior al cerrar o reemplazar el aviso.
  }, [toast, onClose]); // Reinicia el efecto si cambia el aviso o la función de cierre.

  if (!toast) return null; // No renderiza nada cuando no hay mensaje.

  // Presenta el texto del aviso y el botón para cerrarlo manualmente.
  return (
    <div className={`toast-container toast-${toast.type || 'warning'}`} role="alert">
      <div className="toast-content">
        {/* Icono que acompaña visualmente al mensaje. */}
        <AlertTriangle className="toast-icon" size={20} />
        <span className="toast-message">{toast.message}</span>
      </div>
      {/* Cierra el aviso al hacer clic y describe la acción para accesibilidad. */}
      <button onClick={onClose} className="toast-close-btn" aria-label="Cerrar notificación">
        <X size={16} />
      </button>
    </div>
  );
};