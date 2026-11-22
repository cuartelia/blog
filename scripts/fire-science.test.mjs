import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const read=(path)=>readFileSync(resolve(import.meta.dirname,'..',path),'utf8');
const article=read('src/content/articulos/fuego.md');
const component=read('src/components/FireScienceExperiences.astro');
const behavior=read('src/components/FireScienceBehavior.astro');
const page=read('src/pages/articulos/[...slug].astro');

test('ciencia del fuego: el artículo se publica y conserva sus fundamentos',()=>{
  assert.match(article,/^draft: false$/m);
  for (const term of ['oxidación','energía de activación','tetraedro','pirólisis','conducción','convección','radiación','monóxido de carbono'])
    assert.ok(article.toLowerCase().includes(term.toLowerCase()),'Falta '+term);
});

test('enfoque científico: sin secciones de evolución de incendios estructurales',()=>{
  assert.doesNotMatch(article,/^## .*incendio|^### Incendio controlado por combustible o por ventilación/m);
  assert.doesNotMatch(article,/^## .*humo también forma parte/i);
  assert.match(article,/En otras entregas desarrollaremos/);
});

test('diagramas SVG del artículo: archivos seguros, con título y descripción accesible',()=>{
  for(const name of ['fuego-portada','fuego-energia','fuego-transferencia']){
    const svg=read('public/images/articulos/'+name+'.svg');
    assert.match(svg,/<svg /);
    assert.match(svg,/<title /);
    assert.match(svg,/<desc /);
    assert.doesNotMatch(svg,/<script|onload=|<foreignObject/i);
    assert.match(article,new RegExp(name+'\\.svg'));
  }
});

test('tres experiencias interactivas y etiquetas accesibles',()=>{
  for(const name of ['tetra','heat','pyro']){
    assert.match(component,new RegExp('data-fire-'+name));
    assert.match(component,new RegExp('data-fire-attach="'+name+'"'));
    assert.match(behavior,new RegExp('\\[data-fire-'+name+'\\]'));
  }
  assert.match(component,/aria-pressed=/);
  assert.match(component,/role="status"/);
  assert.match(component,/FireScienceBehavior/);
  assert.match(page,/post\.id === 'fuego' && <FireScienceExperiences/);
});

test('no reactivamos otros simuladores del laboratorio',()=>{
  const availability=read('src/lib/simulator-availability.ts');
  assert.doesNotMatch(availability,/^\s*['"](?:pressure|heat)['"],?\s*$/m);
  assert.match(read('src/components/ArticleCard.astro'),/fuego-portada\.svg/);
});
