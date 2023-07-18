import { get, submitData } from "./ajax";

import DOMPurify from "dompurify";
import { TeacherType } from "./types";

import { CollectionType } from "./_localComponents/types";
import { AssignmentQuestionCreateForm } from "./_reusableComponents/types";

export const purify = (html: string) => {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
};

export function titlecase(title: string) {
  return title.slice(0, 1).toUpperCase() + title.slice(1);
}

export const daysDiff = (dueDate: Date) => {
  if (dueDate) {
    const currentDate = new Date();
    // (YYYY-MM-DD)
    const millisBetween: number = dueDate.getTime() - currentDate.getTime();
    const days: number = millisBetween / (1000 * 3600 * 24);
    return Math.round(days);
  }
  return undefined;
};

export const handleCollectionBookmarkClick = async (
  callback: (teacher: TeacherType) => void,
  pk: number,
  teacher: TeacherType | undefined,
  url: string,
  error: (error: Error) => void = (error) => console.error(error),
): Promise<void> => {
  if (teacher) {
    const index = teacher.bookmarked_collections.indexOf(pk);
    const newBookmarkedCollections = [...teacher.bookmarked_collections];
    if (index >= 0) {
      newBookmarkedCollections.splice(index, 1);
    } else {
      newBookmarkedCollections.unshift(pk);
    }
    try {
      const teacher = (await submitData(
        url,
        { bookmarked_collections: newBookmarkedCollections },
        "PUT",
      )) as TeacherType;

      callback(teacher);
    } catch (e: any) {
      error(e);
    }
  }
};

export const updateCollections = async (
  pk: number,
  callback: (collections: CollectionType[]) => void,
  path: string,
  collections: CollectionType[],
): Promise<void> => {
  try {
    const url = new URL(path, window.location.origin);
    url.pathname = `${url.pathname}${pk}/`;

    const collection = (await get(url.toString())) as CollectionType;
    const _collections = [...collections];

    const index = _collections.map((c) => c.pk).indexOf(collection.pk);
    _collections[index] = collection;

    callback(_collections);
  } catch (error: any) {
    console.error(error);
  }
};

export const handleQuestionBookmarkClick = async (
  gettext: (a: string) => string,
  callback: (
    teacher: TeacherType,
    message?: string,
    index?: number,
    newFavouriteQuestions?: number[],
  ) => void,
  pk: number,
  teacher: TeacherType | undefined,
  url: string,
  error: (error: Error) => void = (error) => console.error(error),
): Promise<void> => {
  if (teacher) {
    let message = "";
    const index = teacher.favourite_questions.indexOf(pk);
    const newFavouriteQuestions = [...teacher.favourite_questions];
    if (index >= 0) {
      newFavouriteQuestions.splice(index, 1);
      message = `Q${pk} ${gettext("removed from your library")}`;
    } else {
      newFavouriteQuestions.unshift(pk);
      message = `Q${pk} ${gettext("added to your library")}`;
    }
    try {
      const teacher = (await submitData(
        url,
        { favourite_questions: newFavouriteQuestions },
        "PUT",
      )) as TeacherType;

      callback(teacher, message, index, newFavouriteQuestions);
    } catch (e: any) {
      error(e);
    }
  }
};

export const handleAddToAssignment = async (
  partialForm: AssignmentQuestionCreateForm,
  assignment: string,
  question: number,
  addToAssignmentURL: string,
): Promise<void> => {
  const form = Object.assign(partialForm, {
    assignment,
    question,
  });
  try {
    await submitData(addToAssignmentURL, form, "POST");
  } catch (error: any) {
    if (typeof error === "object") {
      const e = Object.values(error) as string[];
      console.info(e);
    }
  }
};
