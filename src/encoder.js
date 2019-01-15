const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '-',
  '.',
  '_',
  '~',
];

export function encode(lines) {
  const [x, y] = lines[0];
  let base10 = (x << 7) + y;
  let result = '';
  while (base10 > 0) {
    const charValue = base10 % alphabet.length;
    result = alphabet[charValue] + result;
    base10 = (base10 - charValue) / alphabet.length;
  }
  return result;
}

export function decode(str) {
  let base10 = 0;
  for (let i = 0; i < str.length; i++) {
    base10 += alphabet.indexOf(str[str.length - 1 - i]) * Math.pow(alphabet.length, i);
  }

  console.log(base10);

  const result = [];
  while (base10 > 0) {
    const y = base10 & 127;
    base10 >>>= 7;
    const x = base10 & 127;
    base10 >>>= 7;
    result.unshift([x, y]);
  }
  return result;
}

// function encode() {
//   const { width, height } = canvas;
//   const maxSize = encodedLines.reduce(
//     (best, line) =>
//       Math.max(best, line.reduce((best, [x, y]) => Math.max(best, Math.max(x, y)), 0)),
//     0,
//   );
//
//   const resolution = Math.pow(2, 8) - 1;
//   const unit = maxSize / resolution;
//   const encodedLines = lines.map((line) =>
//     line.map(([x, y]) => [Math.round(x / unit), Math.round(y / unit)]),
//   );
// }
