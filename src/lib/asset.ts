/**
 * Ruta a un archivo de /public respetando el `base` de Vite
 * (necesario cuando la web se publica en una subcarpeta, p. ej. GitHub Pages).
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
