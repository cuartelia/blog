import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const posts = readdirSync(resolve(root, 'src/content/articulos')).filter(x=>x.endsWith('.md'));
test('el catálogo incluye los artículos publicados y los borradores esperados',()=>{
  for (const file of ['fuego.md','historia-bomberil-argentina.md','presion.md','voluntariado-bomberil-en-america.md']) {
    assert.ok(posts.includes(file), `falta el artículo ${file}`);
  }
});
test('todos los artículos tienen metadatos y fuentes',()=>{
  for(const file of posts){const text=read(`src/content/articulos/${file}`);
    for(const key of ['title:', 'description:', 'date:', 'category:', 'audience:', 'readingMinutes:', 'sources:']) assert.ok(text.includes(key), `${file}: falta ${key}`);
    assert.match(text,/https:\/\//);
  }
});
test('el contenido público no expone antecedentes ni preparación personal',()=>{
  const files=['src/pages/index.astro','src/pages/acerca.astro',...posts.map(x=>`src/content/articulos/${x}`)];
  for(const file of files) assert.doesNotMatch(read(file),/Barranqueras|Timbúes|mi ingreso|mi proceso de ingreso/i, file);
});
test('los ejemplos físicos conservan sus referencias esperadas',()=>{
  const initial=101.325;
  const p=initial*(10/5)*((20+273.15)/293.15);
  assert.equal(Math.round(p*1000)/1000,202.65);
  const temp=20 + 84/4.184;
  assert.ok(temp>40 && temp<41);
});
test('el sitio contempla navegación y disclaimer',()=>{
  assert.match(read('src/components/Header.astro'),/Biblioteca/);
  assert.match(read('src/components/Header.astro'),/Laboratorio/);
  assert.match(read('src/components/PressureSimulator.astro'),/No modela/);
  assert.match(read('src/components/Footer.astro'),/No (?:sustituye|reemplaza)/);
});

// La publicación se controla desde frontmatter, sin eliminar artículos en elaboración.
test('Historia y Voluntariado se publican; Fuego y Presión quedan en borrador',()=>{
  for(const slug of ['fuego','presion']){
    const md=read(`src/content/articulos/${slug}.md`);
    const frontmatter=md.split('---')[1];
    assert.match(frontmatter,/^draft: true$/m,`${slug} debe permanecer oculto`);
    assert.match(frontmatter,/^feature: false$/m,`${slug} no debe destacarse`);
  }
  for (const slug of ['historia-bomberil-argentina','voluntariado-bomberil-en-america']) {
    const article=read(`src/content/articulos/${slug}.md`);
    assert.doesNotMatch(article.split('---')[1],/^draft: true$/m);
  }
  for(const file of ['src/pages/index.astro','src/pages/biblioteca.astro','src/pages/articulos/[...slug].astro']){
    assert.match(read(file),/!data\.draft/,`${file} debe filtrar los borradores`);
  }
  const lab=read('src/pages/laboratorio.astro');
  assert.doesNotMatch(lab,/articulos\/(fuego|presion)\//);
  const home=read('src/pages/index.astro');
  assert.doesNotMatch(home,/tres lecturas de muestra|03 ARTÍCULOS/);
});

test('Laboratorio declara el helper de rutas que usa en la navegación',()=>{
  const lab=read('src/pages/laboratorio.astro');
  assert.match(lab,/import\s*\{\s*path\s*\}\s*from\s*['"]\.\.\/lib\/site['"]/);
  assert.match(lab,/href=\{path\('biblioteca\/'\)\}/);
});

// Umami se configura una sola vez en el layout y solo se habilita con un ID real.
test('Umami se integra de forma opcional en el layout compartido',()=>{
  const layout=read('src/layouts/BaseLayout.astro');
  const workflow=read('.github/workflows/deploy.yml');
  assert.match(layout,/PUBLIC_UMAMI_WEBSITE_ID/);
  assert.match(layout,/AnalyticsNotice/);
  assert.match(read('src/components/AnalyticsNotice.astro'),/cloud\.umami\.is\/script\.js/);
  assert.match(layout,/umamiEnabled/);
  assert.match(workflow,/vars\.UMAMI_WEBSITE_ID/);
  const notice=read('src/components/AnalyticsNotice.astro');
  assert.match(notice,/script\.onerror/);
  assert.match(notice,/notice\.hidden = false/);
  assert.match(notice,/localStorage\.setItem/);
  assert.match(read('src/components/Footer.astro'),/privacidad\//);
});

test('los simuladores solo se publican cuando se habilitan expresamente',()=>{
  const availability=read('src/lib/simulator-availability.ts');
  assert.match(availability,/enabledSimulatorIds = new Set<string>/);
  assert.doesNotMatch(availability,/^\s*['"](?:pressure|heat)['"],?\s*$/m);
  const lab=read('src/pages/laboratorio.astro');
  assert.match(lab,/simulators\.length > 0/);
  assert.match(lab,/Estamos preparando nuevos simuladores/);
  assert.match(lab,/enabledSimulatorIds\.has/);
  const article=read('src/pages/articulos/[...slug].astro');
  assert.match(article,/enabledSimulatorIds\.has/);
  const home=read('src/pages/index.astro');
  assert.match(home,/Explorá conceptos físicos/);
  assert.match(home,/en movimiento\./);
  assert.match(home,/Entrar al laboratorio/);
  assert.match(home,/MODELOS EDUCATIVOS · NO APTOS PARA DECISIONES OPERATIVAS/);
  assert.match(lab,/Probá, cambiá\./);
  assert.match(lab,/Comprendé\./);
  assert.match(lab,/Simuladores didácticos para visualizar relaciones/);
});
