import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const base = site || new URL('https://cuartelia.ar/');
  const posts = await getCollection('articulos', ({ data }) => !data.draft);
  const routes = ['/', '/biblioteca/', '/laboratorio/', '/acerca/', '/privacidad/'];
  const entries = [
    ...routes.map(route => ({ url: new URL(route, base).href })),
    ...posts.map(post => ({
      url: new URL(`/articulos/${post.id}/`, base).href,
      updated: (post.data.updated || post.data.date).toISOString().slice(0, 10),
    })),
  ];
  const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(entry => `  <url><loc>${escapeXml(entry.url)}</loc>${'updated' in entry ? `<lastmod>${entry.updated}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
