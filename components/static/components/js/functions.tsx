import { get, submitData } from "./ajax";

import { TeacherType } from "./types";

import { CollectionType } from "./_localComponents/types";

export const daysDiff = (dueDate: Date) => {
  if (dueDate) {
    const currentDate = new Date();
    // (YYYY-MM-DD)
    const millisBetween: number = dueDate.getTime() - currentDate.getTime();
    const days: number = millisBetween / (1000 * 3600 * 24);
    return Math.round(Math.abs(days));
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
