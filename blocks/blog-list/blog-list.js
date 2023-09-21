import { getLibs } from '../../scripts/utils.js';

export default async function init(el) {
  const { createTag } = await import(`${getLibs()}/utils/utils.js`);
  const qResp = await fetch('/blog/query-index.json');
  if (!qResp.ok) return;
  const list = createTag('ul', { class: 'blog-list-container' });
  const qJson = await qResp.json();
  qJson.data.forEach(async (post) => {
    const li = createTag('li', { class: 'blog-list-item' });
    list.append(li);
    const resp = await fetch(`${post.path}.plain.html`);
    if (!resp.ok) return;
    const html = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const heading = doc.querySelector('h1, h2, h3, h4, h5, p').textContent;
    const h2 = createTag('h2', {}, heading);
    li.append(h2);
  });
  el.append(list);
}
