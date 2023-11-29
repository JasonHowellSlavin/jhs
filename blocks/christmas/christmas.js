import { getLibs } from '../../scripts/utils.js';
import {
  createContext,
  html,
  render,
  useContext,
  useEffect,
  useReducer,
  useState,
} from '../../deps/htm-preact.js';


function rando(length) {
  return Math.floor(Math.random() * length);
}

export function generateList() {
  const names = ['peggie', 'phyllis', 'ananda', 'derek', 'alison', 'alan', 'galen', 'finnegan', 'alex', 'jason'];
  const names2 = names.slice();

  const list = names.reduce((rdx, name, idx, arr) => {
    let randomName = names2[rando(names2.length)];

    if (randomName === name && idx === arr.length - 1) {
      return generateList();
    }

    while (randomName === name) {
      randomName = names2[rando(names2.length)]
    }
    const randomNameIdx = names2.indexOf(randomName);

    const giftObject = {
      giver: name,
      reciever: randomName
    }

    names2.splice(randomNameIdx, 1)

    rdx.push(giftObject);
    return rdx;
  }, [])

  return list;
}

export function encodeList(list) {
  return list.map((pair) => {
    pair.giver = btoa(pair.giver);
    pair.reciever = btoa(pair.reciever);
    return pair;
  })
}

const Christmas = ({src}) => {
  const namesUrl = 'https://main--jhs--jasonhowellslavin.hlx.page/christmas/names.json';
  const [name, setName]  = useState();
  const [reciever, setReciever] = useState('');

  console.log('src', src)

  useEffect(async () => {
    if (localStorage.getItem('encodedNames')) return;

    const resp = await fetch(namesUrl);
    const json = await resp.json();
    const data = json.data;
    const stringData = JSON.stringify(data);
    localStorage.setItem('encodedNames', stringData);
  }, [])

  const handleInput = e => {
    setName(e.target.value)
  }

  const handleSubmit = () => {
    const sanatize = (val) => {
      return val.trim().toLowerCase();
    }

    const namesList = JSON.parse(localStorage.getItem('encodedNames'));
    const cleanName = sanatize(name);
    const b64name = btoa(cleanName);
    const [giverPair] = namesList.filter((pair) => {
      return pair.giver === b64name;
    })
    const reciever = atob(giverPair.reciever);

    setReciever(reciever.charAt(0).toUpperCase() + reciever.slice(1))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  return html`
  <article style=${{backgroundImage: `url(${src})`}}>
    <h1>Secret Santa!</h1>
    <section>
      <p>Type in your name below, and reveal who you picked!</p>
      <div class='area'>
        <label for='name'>Name:</label>
        <input type='text' vale=${name} onInput=${handleInput} onKeyDown=${handleKeyDown}></input>
        <button onClick=${() => {handleSubmit()}} >submit</button>
      </div>
      <div>
        ${reciever !== '' && html`<p>You are ${reciever}'s secret Santa!</p>`}
      </div>
    </section>
  </article>
    `;
}

export default async function init(el) {
  const pictures = el.querySelectorAll('picture');
  const card = pictures[0];
  const bg = pictures[1];

  const main = document.querySelector('main');
  const bgSrc = bg.querySelector('img').getAttribute('src');
  main.style.backgroundImage = `url(${bgSrc})`;
  const section = document.querySelector('.section');
  section.prepend(card);
  const src = card.querySelector('img').getAttribute('src');
  card.classList.add('card');
  bg.remove();
  card.remove()

  const app = html` <${Christmas} rootEl=${el} src=${src} /> `;
  
  render(app, el);
};
