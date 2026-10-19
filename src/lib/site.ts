export const brand = {
  name: 'Cuartelia',
  tagline: 'Conocimiento que nos acerca.',
  description: 'Divulgación, historia y herramientas interactivas para explorar el universo bomberil. Un espacio independiente para aprender y compartir.',
};

// Astro normaliza BASE_URL con una barra final gracias a trailingSlash: 'always'.
export const base = import.meta.env.BASE_URL;
export const path = (segment = ''): string => `${base}${segment.replace(/^\/+/, '')}`;
export const formattedDate = (date: Date): string =>
  new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
