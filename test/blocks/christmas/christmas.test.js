import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { generateList, encodeList, dateIsExpired } from '../../../blocks/christmas/christmas.js';
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

describe('Expiry func', () => {
  it('reutrns true when the current time is nearly identical', () => {
    const currentDate = new Date(Date.now());

    const sameExactDate = dateIsExpired(`{"year": ${currentDate.getYear()}, "month": ${currentDate.getMonth()}}`);
    expect(sameExactDate).to.be.true;
  })

  it('reutrns false when the current year is greater than the stored year', () => {
    const currentDate = new Date(Date.now());

    const sameExactDate = dateIsExpired(`{"year": ${currentDate.getYear() - 1}, "month": ${currentDate.getMonth()}}`);
    expect(sameExactDate).to.be.false;
  })

  it('reutrns false when the current time is 3 months past the stored time', () => {
    const currentDate = new Date(Date.now());

    const sameExactDate = dateIsExpired(`{"year": ${currentDate.getYear()}, "month": ${currentDate.getMonth() - 4}}`);
    expect(sameExactDate).to.be.false;
  })
})
