export function lettersNumbersUnderscoreOnly(value: string) {
  const re = new RegExp(/\w/g);
  return [...value.matchAll(re)].length == value.length;
}
