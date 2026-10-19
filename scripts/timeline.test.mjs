import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const data=readFileSync(new URL('../src/lib/timelineData.ts', import.meta.url),'utf8');
const component=readFileSync(new URL('../src/components/timelines/bomberos-argentina.astro', import.meta.url),'utf8');
function collection(name){const m=data.match(new RegExp('export const '+name+': TimelineEvent\\[\\] = ([\\s\\S]*?);\\n'));assert.ok(m);return JSON.parse(m[1]);}
const argentina=collection('nationalTimeline'),santafe=collection('santaFeTimeline');
test('chronologies contain documented milestones',()=>{
 assert.equal(argentina.length,16);assert.equal(santafe.length,3);
 for(const events of [argentina,santafe]){
  assert.deepEqual(events.map(e=>e.date),events.map(e=>e.date).toSorted());
  for(const e of events){assert.ok(e.title&&e.description&&e.context&&e.sources.length);for(const src of e.sources)assert.equal(new URL(src.url).protocol,'https:');}
 }
});
test('critical corrected dates are preserved',()=>{
 assert.equal(argentina.find(e=>e.id==='arg-1889').date,'1889-11-07');
 assert.equal(argentina.find(e=>e.id==='arg-1900').date,'1900-07-15');
 assert.equal(santafe.find(e=>e.id==='sf-1970').date,'1970-08-09');
 assert.ok(!santafe.some(e=>e.date==='1950-05'));
});
test('interactive timeline is keyboard navigable',()=>{
 for(const word of ['role="tablist"','role="tabpanel"','aria-selected','ArrowRight','ArrowLeft','<details','prefers-reduced-motion'])assert.ok(component.includes(word));
});
