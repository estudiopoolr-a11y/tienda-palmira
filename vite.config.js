import { defineConfig } from 'vite' // Importa el helper para definir la configuración de Vite.
import react from '@vitejs/plugin-react' // Importa el plugin que permite usar React y JSX.

// Exporta la configuración del servidor de desarrollo y de la compilación.
export default defineConfig({
  plugins: [
    react() // Activa el procesamiento de componentes React.
  ],
  server: {
    port: 5173, // Usa el puerto local 5173 para el servidor de desarrollo.
    open: true, // Abre automáticamente el navegador al ejecutar npm run dev.
    host: true  // Permite acceder al servidor desde otros dispositivos de la red local.
  },
  build: {
    outDir: 'dist', // Guarda los archivos finales de la compilación en la carpeta dist.
    sourcemap: false // Evita generar mapas de código fuente en la compilación de producción.
  }
})