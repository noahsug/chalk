// base 64 alphabet
const alphabet = [
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
  '-',
  '.',
];

export function encode(lines, { width, height }) {
  if (lines.length === 0) return '';
  const r = 126 / Math.max(width, height);

  const flatLines = [Math.round(width * r), Math.round(height * r)];
  lines.forEach((line, i) => {
    line.forEach((p) => {
      p.forEach((v) => {
        flatLines.push(Math.max(Math.round(v * r), 1));
      });
    });
    // 127 means end of a line
    if (i !== lines.length - 1) flatLines.push(127);
  });
  return encodeBase128ToBase64(flatLines);
}

export function decode(str, { width, height }) {
  if (str.length === 0) return [];

  const [decodedWidth, decodedHeight, ...flatLines] = decodeBase64ToBase128(str);
  const r = Math.min(width / decodedWidth, height / decodedHeight);
  const widthOffset = (width - decodedWidth * r) / 2;
  const heightOffset = (height - decodedHeight * r) / 2;

  const result = [[]];
  let addingX = true;
  flatLines.forEach((v) => {
    if (v === 127) {
      result.push([]);
      return;
    }
    const line = result[result.length - 1];
    if (addingX) {
      line.push([Math.round(widthOffset + v * r), Math.round(heightOffset)]);
    } else {
      line[line.length - 1][1] = Math.round(heightOffset + v * r);
    }
    addingX = !addingX;
  });
  return result;
}

function encodeBase128ToBase64(values) {
  let result = '';
  let base10 = 0;
  let shift = 0;
  values.forEach((v) => {
    base10 += v << shift;
    shift += 7;
    while (shift >= 6) {
      const charValue = base10 & 63;
      result += alphabet[charValue];
      base10 >>>= 6;
      shift -= 6;
    }
  });
  if (base10 > 0) {
    const charValue = base10 & 63;
    result += alphabet[charValue];
  }
  return result;
}

function decodeBase64ToBase128(str) {
  const result = [];
  let shift = 0;
  let base10 = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    base10 += alphabet.indexOf(char) << shift;
    shift += 6;
    if (shift >= 7) {
      result.push(base10 & 127);
      base10 >>>= 7;
      shift -= 7;
    }
  }
  if (base10 > 0) {
    result.push(base10 & 127);
  }
  return result;
}
