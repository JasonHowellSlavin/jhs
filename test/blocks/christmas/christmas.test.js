import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { generateList, encodeList } from '../../../blocks/christmas/christmas.js';
import { setLibs } from '../../../scripts/utils.js';

// document.body.innerHTML = await readFile({ path: './mocks/body.html' });
// setLibs('/libs');

describe('Chrismtas List', () => {
  it('generates a list', () => {
    const list = generateList();

    list.forEach((name) => {
      // console.log(name.giver, name.reciever)
      expect(name.giver !== name.reciever).to.be.true;
    })
  })

  it('encodes the list', () => {
    const list2 = generateList();
    const encodedList = encodeList(list2);
    console.log(encodedList);
  })
});
