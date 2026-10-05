// Convierte un número en una cadena con el formato de moneda de Colombia.
export const formatCOP = (val) => { // Recibe el valor numérico que se debe presentar.
    return new Intl.NumberFormat("es-CO", { // Crea el formateador para la configuración regional de Colombia.
        style: "currency", // Indica que el valor debe mostrarse como dinero.
        currency: "COP", // Selecciona el peso colombiano como moneda.
        maximumFractionDigits: 0, // Omite decimales para mostrar pesos enteros.
    }).format(val); // Devuelve el número formateado como texto.
} // Cierra la función exportada.