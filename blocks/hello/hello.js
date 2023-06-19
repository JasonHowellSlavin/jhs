import { getLibs } from '../../scripts/utils.js';

export default async function init(el) {
  const { textContent } = el;
  el.innerHTML = '';
  const textArr = textContent.trim().split(',');
  const hello = textArr[0] || 'Hello';
  const name = textArr[1] || 'World';
  const { createTag, loadScript } = await import(`${getLibs()}/utils/utils.js`);
  const helloEl = createTag('h2', { class: 'hello-title' }, `${hello},`);
  const nameEl = createTag('p', { class: 'hello-name' }, name.trim());
  el.append(helloEl, nameEl);
  if (textArr[0] || textArr[1]) {
    await loadScript('/deps/gsap.min.js');
    if (textArr[0]) window.gsap.to(helloEl, { x: 200 });
    if (textArr[1]) window.gsap.to(nameEl, { x: 400 });
  }
}
