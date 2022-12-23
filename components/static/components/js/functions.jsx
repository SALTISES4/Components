export const daysDiff = (date) => {
  const currentDate = new Date();
  // (YYYY-MM-DD)
  const dueDate = new Date(date);
  const millisBetween = dueDate.getTime() - currentDate.getTime();
  const days = millisBetween / (1000 * 3600 * 24);
  return Math.round(Math.abs(days));
};
