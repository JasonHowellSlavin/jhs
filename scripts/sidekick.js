import { getLibs } from './utils.js';

export default async function init() {
  const { createTag, loadBlock } = await import(`${getLibs()}/utils/utils.js`);

  const academyListener = async () => {
    const academy = createTag('div', { class: 'academy' });
    const content = await loadBlock(academy);
    document.querySelector('.section:last-of-type').append(content);
  };

  const sk = document.querySelector('helix-sidekick');
  sk.addEventListener('custom:showblocks', academyListener);
}
