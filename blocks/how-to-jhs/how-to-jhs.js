export default async function init(el) {
  const [heading, list] = el.querySelectorAll(':scope > div');

  heading.classList.add('heading-container');
  list.classList.add('list-container');

  const btn = document.createElement('button');
  btn.innerText = 'Submit';
  btn.classList.add('poster');
  el.append(btn);

  const url = 'https://main--jhs--jasonhowellslavin.hlx.page/email-form';

  const errl = 'https://admin.hlx.page/form/jasonhowellslavin/jhs/main/email-form.json';
  const data = { "data": {"firstName": "Spruce" }};

  btn.addEventListener('click', async () => {
    const response = await fetch(url, {
      method: 'POST',
      mode: "no-cors", // no-cors, *cors, same-origin
      data: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response;
  });
}
