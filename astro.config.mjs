import { defineConfig } from 'astro/config';

// En GitHub Actions se inyectan los valores correctos según el repositorio.
// Para un dominio personalizado: SITE_URL=https://cuartelia.tld BASE_PATH=/
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
});
