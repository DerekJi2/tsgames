export function hex2binstr(hexNumString: string, strLen: number) {
  const replaceChar = 'O';
  const binNum = parseInt(hexNumString).toString(2).replace(/0/ig, replaceChar);
  let binstr = binNum;

  for (let i = 0; i < strLen - binNum.length ; i++ ) {
    binstr = replaceChar + binstr;
  }

  return binstr;
}