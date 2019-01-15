import { encode, decode } from './encoder';

it('encodes a line into a string', () => {
  expect(encode([[1, 2]])).toBe('b_');
});

it('decodes a string into a line', () => {
  expect(decode('~~~~~~~~~~~')).toEqual([[1, 2]]);
});
