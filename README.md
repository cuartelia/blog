# Cuartelia ◆

**Conocimiento que nos acerca.** Blog independiente de divulgación bomberil, historia, ciencia aplicada y simuladores educativos. Proyecto de [la organización Cuartelia](https://github.com/cuartelia), desarrollado con **Astro 5**, TypeScript, Markdown y CSS. Contenido en español de Argentina.

> **Alcance:** el sitio es educativo. No representa a ningún cuartel ni reemplaza formación, procedimientos operativos, manuales o instrucciones de fabricantes.

## Funcionalidades

- Home editorial, accesible y responsive; identidad con un rombo **◆** en lugar de símbolos que puedan confundirse con otras marcas.
- Biblioteca con tarjetas, búsqueda y filtros por tema y público. Pagefind indexa el **texto completo** en producción; en desarrollo hay filtrado local por metadatos.
- Artículos en Markdown con esquema de metadatos, tabla de contenidos, bibliografía y relacionados.
- Simuladores de gases ideales (presión/volumen/temperatura) y calentamiento idealizado de agua. Cada artículo elige sus simuladores mediante metadatos.
- Cero backend: construcción estática, workflow de GitHub Actions y despliegue a GitHub Pages.
- Privacidad: sin analytics ni seguimiento de lectores. Google Fonts se descarga desde el navegador; se pueden desactivar sus enlaces en el layout.

## Estructura

```text
.github/workflows/deploy.yml         Despliegue a GitHub Pages
public/                              Favicon, Open Graph, robots y .nojekyll
src/content/articulos/               Tres publicaciones de ejemplo (.md)
src/content.config.ts                Validación de frontmatter con Zod
src/pages/                           Home, biblioteca, artículos y laboratorio
src/pages/articulos/[...slug].astro   Plantilla de artículos; sin condicionales por slug
src/components/                     Navegación, tarjetas, diseño y simuladores
src/components/simulators/           Registro por archivo: pressure.astro, heat.astro
src/lib/simulations.mjs              Fórmulas físicas compartidas y testeables
src/styles/global.css                Sistema visual y responsive
scripts/*.test.mjs                   Pruebas de contenido, arquitectura y fórmulas
astro.config.mjs                     Configuración Astro + ruta base
```

## Desarrollo local

Requiere **Node.js 22** y npm (versiones recomendadas para este proyecto).

```bash
npm install
npm run dev       # http://localhost:4321
npm test          # tests sin navegador
npm run check     # análisis de tipos Astro
npm run build     # Astro + índice de Pagefind
npm run preview   # build ya generado
```

`npm run dev` utiliza filtros por título, descripción y categorías, pero Pagefind requiere `npm run build` para indexar el contenido íntegro del artículo. La búsqueda en producción funciona sin servicios externos.

El repositorio se publica inicialmente sin `package-lock.json` porque el entorno de preparación no pudo acceder al registro npm. **Después del primer `npm install`, commiteá el lockfile**; el workflow hará `npm ci` cuando exista.

## Publicar un artículo

Creá `src/content/articulos/nombre-corto.md`:

```yaml
---
title: 'Presión y temperatura'
description: 'Introducción a la física de los gases.'
date: 2026-10-18
category: Ciencia aplicada
audience: [Aspirantes, Cadetes, Bomberos, Público general]
readingMinutes: 6
feature: false
draft: false
simulators: [pressure]
sources:
  - label: 'NASA — Equation of State'
    url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/equation-of-state/'
---

Texto en **Markdown** con subtítulos y referencias.
```

Categorías definidas en `src/content.config.ts`: `Historia`, `Fundamentos`, `Ciencia aplicada`, `Seguridad`, `Comunicaciones`, `Formación`. El campo `audience` acepta `Aspirantes`, `Cadetes`, `Bomberos` y `Público general`.

- `draft: true`: excluye la nota de las páginas generadas y la biblioteca. **Atención:** si el repositorio pasa a ser público, el Markdown seguirá siendo visible en GitHub. Los borradores realmente privados deben mantenerse fuera del repositorio.
- `simulators`: lista opcional de identificadores (`[]`, `[pressure]`, `[heat]` o `[pressure, heat]`); se renderizan en el orden indicado al final de la lectura, antes de la bibliografía.
- `sources`: referencias con título y URL, presentadas al final de cada publicación.

### Agregar un simulador nuevo (sin editar rutas)

1. Creá `src/components/simulators/mi-simulador.astro`. El nombre del archivo es su identificador. Podés poner ahí el componente completo o reexportar un componente existente:

   ```astro
   ---
   import MiSimulador from '../MiSimulador.astro';
   ---
   <MiSimulador />
   ```

2. En el frontmatter del artículo agregá `simulators: [mi-simulador]`.
3. Corré `npm test && npm run check && npm run build`.

La página dinámica usa `import.meta.glob('../../components/simulators/*.astro')` y **carga solo los módulos referenciados por el artículo** durante el build; no existe una tabla manual de condicionales por `post.id`. Si el ID del frontmatter no coincide con un archivo, el build falla con un mensaje identificable.

La página `/laboratorio/` mantiene un catálogo fijo de los dos simuladores de ejemplo, separado de los simuladores embebidos en artículos. En el futuro podríamos migrar también su listado a un manifiesto central.

### Sobre los modelos físicos

**Presión.** Modelo de cantidad fija de gas ideal: `P₂ = P₁ × V₁/V₂ × T₂/T₁`, presiones absolutas y temperatura en kelvin. Rango: volumen 5–20 L, temperatura 0–180 °C. Presión inicial 101,325 kPa con 10 L y 20 °C. Indicador de 0–350 kPa, suficiente para el máximo de los controles.

**Calor.** Modelo `Q = m c ΔT`, con 1 kg de agua, `c = 4,184 kJ/(kg·°C)`, temperatura inicial 20 °C, sin pérdidas ni cambios de fase. Rango de energía: 0–300 kJ, por lo tanto temperatura por debajo de 100 °C.

La aguja de presión rota alrededor de su eje central en SVG; el termómetro utiliza una transformación vertical anclada en la base, para evitar saltos de posición. Ambos responden inmediatamente al movimiento de sliders, admiten reinicio y respetan `prefers-reduced-motion`. **No utilizar las simulaciones para cálculos operativos o dimensionamiento de equipos.**

## GitHub Pages

Repositorio previsto: `cuartelia/blog`. Rama principal: `main`.

1. En GitHub abrí **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Verificá permisos de Actions/Pages para la organización y el repositorio.
3. Hacé push a `main`: el workflow `.github/workflows/deploy.yml` ejecuta el build y publica `dist/`.
4. Antes de configurar dominio propio, el workflow construye con `SITE_URL=https://cuartelia.github.io` y `BASE_PATH=/blog`. La dirección temporal sería `https://cuartelia.github.io/blog/` si Pages está habilitado.

**Advertencia:** el repositorio se creó como **privado**. La publicación de GitHub Pages para repositorios privados depende del plan y la configuración de la organización. En GitHub Free normalmente se necesita un repositorio público para usar Pages. Si necesitás mantener el código privado, revisá el plan antes de habilitar Pages.

### Dominio comprado: `cuartelia.ar`

El dominio está adquirido, pero **no significa que el DNS ya esté configurado**. Para activarlo:

1. En tu registrador DNS configurá los registros **A** del apex `cuartelia.ar` con las IP de GitHub Pages según la [guía oficial de GitHub](https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). No copies IPs de una fuente no verificada.
2. En **Settings → Pages → Custom domain**, establecé `cuartelia.ar` y guardá.
3. En **Settings → Secrets and variables → Actions → Variables**, creá `CUSTOM_DOMAIN_URL=https://cuartelia.ar`.
4. Agregá un archivo `public/CNAME` que contenga exactamente `cuartelia.ar` (sin protocolo) y desplegá nuevamente. Comprobá que el dominio seleccionado no se sobrescriba por otra publicación.
5. Esperá a que GitHub detecte el dominio y habilitá **Enforce HTTPS** cuando esté disponible. Revisá también el dominio con `dig` o un comprobador de DNS.

> El dominio no está configurado en esta entrega; esos cambios requieren administrar DNS y Pages. No cambies el `BASE_PATH` a `/` hasta estar listo para usar la URL propia.

### Variables y rutas

- `SITE_URL`: origen de la web, sin subruta (`https://cuartelia.github.io` o `https://cuartelia.ar`).
- `BASE_PATH`: `/blog` en Pages por repositorio o `/` en dominio propio.
- `CUSTOM_DOMAIN_URL`: variable de GitHub Actions para configurar las anteriores automáticamente.

## Calidad y accesibilidad

- Navegación por teclado, `skip link`, controles etiquetados, texto alternativo y estilos de foco.
- `prefers-reduced-motion` desactiva las transiciones animadas cuando se solicita.
- No hay datos personales ni referencias públicas al proceso de ingreso de ningún integrante.
- Pruebas con `npm test` cubren fórmulas, extremos, registro de simuladores, ausencia de condicionales por slug y símbolos visuales.

**Limitación de validación de esta entrega:** se ejecutaron las pruebas Node, pero no `astro check` ni `astro build` porque npm no estuvo accesible desde el entorno de generación. El workflow de GitHub y/o un equipo con conexión a npm deben realizar esa validación antes de publicar.

## Licencia y fuentes

No se incluye licencia de reutilización automática del código o contenidos. Si querés publicarlos bajo una licencia open source o Creative Commons, agregá los archivos de licencia apropiados antes de distribuirlos. Las fuentes de divulgación de cada artículo están en su campo `sources`.
