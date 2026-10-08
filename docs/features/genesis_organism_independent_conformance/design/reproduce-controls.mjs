// Independent literal D08 control check; run from repository root.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { relatedExpression } from '../../../../src/related-expression.mjs';
const origin=JSON.parse(fs.readFileSync('fixtures/encounter-v1/origin.json'));
const event=JSON.parse(fs.readFileSync('fixtures/encounter-v1/000001.json'));
const observer={version:'observer-v1',observerType:'independent-machine',subject:event.body.data.evidence.observer.subject,capabilities:{symbols:{supported:true,evidence:'claimed'}}};
const policy={version:'policy-related-v1',allow:['relationship-symbols-v1'],disclosure:'public-synthetic',relationships:true};
const treatment=relatedExpression(origin,[event],observer,policy);
const baseline=relatedExpression(origin,[],observer,policy);
assert.deepEqual(treatment.output.grammar,[128,255,0,64]);
assert.deepEqual(baseline.output.grammar,[0,64,128,255]);
assert.deepEqual(relatedExpression(origin,[event],observer,policy,{mode:'no-memory-control'}).output,baseline.output);
assert.deepEqual(relatedExpression(origin,[event],observer,{...policy,relationships:false}).output,baseline.output);
assert.deepEqual(relatedExpression(origin,[event],{...observer,subject:'independent-other'},policy).output,baseline.output);
assert.equal(treatment.output.signal,baseline.output.signal);
assert.deepEqual(relatedExpression(origin,[event],observer,policy),treatment);
console.log(JSON.stringify({checks:7,passed:7,scope:'literal D08 synthetic controls'}));
