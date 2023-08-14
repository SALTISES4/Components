import {
  AnswerStyles,
  QuestionImageTypes,
  QuestionTypes,
} from "./_localComponents/enum";
import { purifyText } from "./functions";

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

export const assignmentIdentifierValidator = (identifier: string) => {
  return (
    lettersNumbersUnderscoreOnlyValidator(identifier) &&
    lengthValidator(identifier, 2, 100)
  );
};

export const assignmentTitleValidator = (title: string | undefined) => {
  if (title === undefined) {
    return false;
  }
  return lengthValidator(title.trim(), 1, 200);
};

export const questionAnswerStyleValidator = (
  answer_style: string | undefined,
) => {
  if (answer_style === undefined) {
    return false;
  }
  return answer_style in AnswerStyles;
};

export const questionImageValidator = (image: File | undefined) => {
  if (image === undefined) {
    return true;
  }
  const extension = image.type.toLowerCase().split("/").at(-1);
  return (
    extension &&
    (Object.values(QuestionImageTypes) as string[]).includes(extension)
  );
};

export const questionTextValidator = (text: string | undefined) => {
  // Ensure that text is not "" or whitespace or just tags
  if (text === undefined) {
    return false;
  }
  return lengthValidator(purifyText(text).trim(), 1, 2000);
};

export const questionTitleValidator = (title: string | undefined) => {
  // Ensure that text is not "" or whitespace
  if (title === undefined) {
    return false;
  }
  return lengthValidator(title.trim(), 1, 100);
};

export const questionTypeValidator = (type: string | undefined) => {
  if (type === undefined) {
    return false;
  }
  return type in QuestionTypes;
};
