import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { GAS_REFERENCE, PRESSURE_SCALE_MAX_KPA, idealGasPressure, waterTemperature } from '../src/lib/simulations.mjs';
const read = (file) => readFileSync(resolve(import.meta.dirname, '..', file), 'utf8');

const closeTo = (actual, expected, tolerance = 0.01) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≈ ${expected}`);
test('presión del gas ideal: estado inicial, volumen inverso, temperatura Kelvin', () => {
  closeTo(idealGasPressure(10, 20), GAS_REFERENCE.pressureKPa, 1e-9);
  closeTo(idealGasPressure(5, 20), GAS_REFERENCE.pressureKPa * 2, 1e-9);
  closeTo(idealGasPressure(10, 180), GAS_REFERENCE.pressureKPa * 453.15 / 293.15, 1e-9);
  assert.ok(idealGasPressure(20, 0) < idealGasPressure(10, 20));
  assert.ok(idealGasPressure(5, 180) < PRESSURE_SCALE_MAX_KPA, 'la escala debe cubrir todo el rango del slider');
});
test('energía térmica: condición inicial, incremento, no hervir', () => {
  closeTo(waterTemperature(0), 20);
  closeTo(waterTemperature(84), 40.07648, 0.01);
  closeTo(waterTemperature(300), 91.70172, 0.01);
  assert.throws(() => waterTemperature(400), RangeError);
  assert.throws(() => waterTemperature(-1), RangeError);
});
test('errores de variables físicas inválidas', () => {
  for (const v of [0, -10, Infinity, NaN]) assert.throws(() => idealGasPressure(v, 20), RangeError);
  assert.throws(() => idealGasPressure(10, -273.15), RangeError);
});
test('registro dinámico de simuladores sin dependencia del slug de la nota', () => {
  const route = read('src/pages/articulos/[...slug].astro');
  assert.match(route, /import\.meta\.glob/);
  assert.match(route, /post\.data\.simulators/);
  assert.doesNotMatch(route, /post\.id\s*===/);
  const components = readdirSync(resolve(import.meta.dirname, '..', 'src/components/simulators'));
  const files = readdirSync(resolve(import.meta.dirname, '..', 'src/content/articulos')).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const md = read(`src/content/articulos/${file}`);
    const match = md.match(/^simulators:\s*\[([^\]]*)\]/m);
    if (match) for (const id of match[1].split(',').map(x => x.trim()).filter(Boolean)) {
      assert.ok(components.includes(`${id}.astro`), `Simulador ${id} de ${file} no existe`);
    }
  }
});
test('decoración de marca: no usamos la estrella anterior', () => {
  for (const file of ['src/pages/index.astro', 'src/pages/biblioteca.astro', 'src/pages/acerca.astro']) {
    assert.doesNotMatch(read(file), /✳/, `Revisar símbolo de ${file}`);
  }
});
