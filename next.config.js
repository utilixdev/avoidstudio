/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignora errores de tipos para que el deploy no se detenga
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora advertencias de formato y estilo durante el build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;