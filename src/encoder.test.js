import { encode, decode } from './encoder';

function testEncodeDecodeSymetry(lines) {
  const size = { width: 126, height: 126 };
  expect(decode(encode(lines, size), size)).toEqual(lines);
}

it('encodes nothing as an empty string', () => {
  expect(encode([], {})).toBe('');
});

it('decodes nothing as an empty array', () => {
  expect(decode('', {})).toEqual([]);
});

it('encodes and decodes a single point line', () => {
  const lines = [[[1, 2]]];
  testEncodeDecodeSymetry(lines);
});

it('encodes and decodes a multi-point line', () => {
  const lines = [[[8, 20], [126, 44]]];
  testEncodeDecodeSymetry(lines);
});

it('encodes and decodes a long line', () => {
  const lines = [[[8, 20], [126, 44], [66, 89], [67, 67], [126, 0], [5, 6], [100, 99]]];
  testEncodeDecodeSymetry(lines);
});

it('encodes and decodes multiple lines', () => {
  const lines = [[[8, 20], [20, 100]], [[0, 126], [126, 126]], [[0, 0], [126, 126]]];
  testEncodeDecodeSymetry(lines);
});

it('encodes using minimal characters', () => {
  const lines = [[[8, 20], [126, 44], [66, 89], [67, 67], [126, 0], [5, 6], [100, 99]]];
  expect(encode(lines, { width: 126, height: 126 }).length).toBe(19);
});

it('adjusts for screen size changes', () => {
  const lines = [[[25, 75]]];
  const encodeScreen = { width: 50, height: 100 };
  const decodeScreen = { width: 200, height: 300 };
  const [[[x, y]]] = decode(encode(lines, encodeScreen), decodeScreen);
  expect(Math.abs(x - 100)).toBeLessThan(2);
  expect(Math.abs(y - 226)).toBeLessThan(2);
});
