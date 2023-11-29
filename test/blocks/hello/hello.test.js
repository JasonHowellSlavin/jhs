import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import initHello from '../../../blocks/hello/hello.js';
import { setLibs } from '../../../scripts/utils.js';

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
setLibs('/libs');

describe('The hello block', () => {
  beforeEach(() => {
    window.gsap = undefined;
    document.head.querySelector('[src="/deps/gsap.min.js"]')?.remove();
  });

  it('Adds world when only hello exists', async () => {
    const hello = document.querySelector('#hello-only');
    await initHello(hello);
    const p = hello.querySelector('p');
    expect(p.textContent).to.equal('World');
    expect(window.gsap).to.exist;
  });

  it('Adds both texts when they exist', async () => {
    const hello = document.querySelector('#all-copy');
    await initHello(hello);
    const p = hello.querySelector('p');
    expect(p.textContent).to.equal('Chris');
    expect(window.gsap).to.exist;
  });

  it('Adds hello when nothing exists', async () => {
    const hello = document.querySelector('#no-copy');
    await initHello(hello);
    const h2 = hello.querySelector('h2');
    expect(h2.textContent).to.equal('Hello,');
    expect(window.gsap).to.not.exist;
  });
});
