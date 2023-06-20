export default async function init(el) {
  const [heading, list] = el.querySelectorAll(':scope > div');

  heading.classList.add('heading-container');
  list.classList.add('list-container');
}
