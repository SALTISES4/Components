export function lettersNumbersUnderscoreOnlyValidator(value: string) {
  const re = new RegExp(/\w/g);
  return [...value.matchAll(re)].length == value.length;
}

export function lengthValidator(
  value: string,
  minimum: number,
  maximum: number,
) {
  return value.length >= minimum && value.length <= maximum;
}

export function emailValidator(value: string) {
  const re = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  return re.test(value);
}
