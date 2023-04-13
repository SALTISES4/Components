import { submitData } from "./ajax";

import { TeacherType } from "./types";

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
