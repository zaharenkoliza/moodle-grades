import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/index.js';

const origin = 'https://liza.example.test';
const env = {};
test('grade table sends credentials directly from the browser to Moodle', async () => {
  const response = await worker.fetch(new Request(origin + '/grades'), env);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('Content-Security-Policy'), /connect-src 'self' https:\/\/node-server\.ru/);
  const html = await response.text();
  assert.match(html, /fetch\('https:\/\/node-server\.ru\/m'\+path/);
  assert.match(html, /name="username"/);
  assert.match(html, /name="password"/);
  assert.doesNotMatch(html, /О проекте|name="authmode"|name="moodle"|name="token"/);
  assert.doesNotMatch(html, /fetch\(['"]\/api\/grades/);
  const home = await worker.fetch(new Request(origin + '/'), env);
  assert.equal(home.status, 302);
  assert.equal(home.headers.get('Location'), origin + '/grades');
  const oldEndpoint = await worker.fetch(new Request(origin + '/api/grades', {
    method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify({ moodle: 'node', authmode: 'password', username: 'student', password: 'test-password' })
  }), env);
  assert.equal(oldEndpoint.status, 404);
});
