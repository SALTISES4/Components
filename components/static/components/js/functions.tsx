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
