import {
  AllowedEmbedHosts,
  AnswerStyles,
  QuestionImageTypes,
  QuestionTypes,
  RationaleSelectionAlgorithms,
} from "./_localComponents/enum";
import { purifyText } from "./functions";
import { AnswerChoiceForm } from "./types";

export function booleanValidator(value: any) {
  return typeof value == "boolean";
}

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
  answer_style: AnswerStyles | string | undefined,
) => {
  if (answer_style === undefined) {
    return false;
  }
  return answer_style in AnswerStyles;
};

export const questionImageValidator = (image: File) => {
  if (image.size == 0) {
    return true;
  }
  const extension = image.type.toLowerCase().split("/").at(-1);
  return (
    extension &&
    (Object.values(QuestionImageTypes) as string[]).includes(extension) &&
    image.size < 1e6
  );
};

export const questionImageAltTextValidator = (text: string) => {
  /*
  - Question model imposes 1024 character limit
  */
  return lengthValidator(text.trim(), 1, 1024);
};

export const questionRationaleSelectionAlgorithmValidator = (
  alg: string | undefined,
) => {
  if (alg === undefined) {
    return false;
  }
  return alg in RationaleSelectionAlgorithms;
};

export const questionTextValidator = (text: string | undefined) => {
  /*
  - Question serializer imposes 8000 character limit on text without tags
  - Ensure that text is not "" or whitespace or just tags
  */
  if (text === undefined) {
    return false;
  }
  return lengthValidator(purifyText(text).trim(), 1, 8000);
};

export const questionTitleValidator = (title: string | undefined) => {
  /*
  - Question model imposes 100 character limit
  - Ensure that text is not "" or whitespace
  */
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

export const questionVideoURLValidator = (url: string) => {
  if (url === "") {
    return true;
  }
  try {
    const _url = new URL(url);
    return (
      (Object.values(AllowedEmbedHosts) as string[]).includes(_url.hostname) &&
      _url.protocol == "https:"
    );
  } catch {
    return false;
  }
};

export const answerChoiceValidator = (answerChoice: AnswerChoiceForm) => {
  /*
  - AnswerChoice model imposes 500 character limit on text
  - Answer serializer imposes 4000 character limit on rationale
  - Check all texts are not "" or whitespace or just tags
  */
  return (
    purifyText(answerChoice.text.trim()).length > 0 &&
    lengthValidator(answerChoice.text.trim(), 1, 500) &&
    answerChoice.sample_answers !== undefined &&
    answerChoice.sample_answers.length > 0 &&
    answerChoice.sample_answers.every(
      (ac) => purifyText(ac.rationale.trim()).length > 0,
    ) &&
    answerChoice.sample_answers.every((ac) =>
      lengthValidator(ac.rationale.trim(), 1, 4000),
    ) &&
    (answerChoice.correct
      ? answerChoice.expert_answers !== undefined &&
        answerChoice.expert_answers.length > 0 &&
        answerChoice.expert_answers.every(
          (ac) => purifyText(ac.rationale.trim()).length > 0,
        ) &&
        answerChoice.expert_answers.every((ac) =>
          lengthValidator(ac.rationale.trim(), 1, 4000),
        )
      : true)
  );
};
