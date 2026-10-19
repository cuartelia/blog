import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const posts = readdirSync(resolve(root, 'src/content/articulos')).filter(x=>x.endsWith('.md'));
test('hay exactamente tres artículos de demostración',()=>{
  assert.deepEqual(posts.sort(), ['fuego.md','historia-bomberil-argentina.md','presion.md']);
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
  assert.match(read('src/components/Footer.astro'),/No sustituye/);
});

// La publicación se controla desde frontmatter, sin eliminar artículos en elaboración.
test('solo Historia bomberil se publica; Fuego y Presión quedan en borrador',()=>{
  for(const slug of ['fuego','presion']){
    const md=read(`src/content/articulos/${slug}.md`);
    const frontmatter=md.split('---')[1];
    assert.match(frontmatter,/^draft: true$/m,`${slug} debe permanecer oculto`);
    assert.match(frontmatter,/^feature: false$/m,`${slug} no debe destacarse`);
  }
  const history=read('src/content/articulos/historia-bomberil-argentina.md');
  assert.doesNotMatch(history.split('---')[1],/^draft: true$/m);
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

test('ley bomberil permanece en borrador e incorpora marco organizativo y escalafón',()=>{
  const md=read('src/content/articulos/ley-del-sistema-bomberil.md');
  const frontmatter=md.split('---')[1];
  assert.match(frontmatter,/^draft: true$/m);
  assert.match(frontmatter,/^rankGuide: santa-fe-2025$/m);
  for(const topic of ['asamblea','comisión directiva','cuerpo activo','servicio público','carga pública','jerárquico','atribuciones','obligaciones','25.054','12.969'])
    assert.ok(md.toLocaleLowerCase('es-AR').includes(topic), `Falta abordar: ${topic}`);
  const page=read('src/pages/articulos/[...slug].astro');
  assert.match(page,/post\.data\.rankGuide === 'santa-fe-2025'/);
  assert.match(read('src/content.config.ts'),/rankGuide: z\.enum/);
  const guide=read('src/components/RankGuide.astro');
  assert.match(guide,/Comandante General/);
  assert.match(guide,/Oficial Ayudante/);
  assert.match(guide,/Cabo Primero/);
});
