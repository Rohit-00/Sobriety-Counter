export const calcWeek = () => {
  const today = new Date();
  today.setDate(today.getDate() - 7);
  return today;
};

// Calculate this month's first date
export const getFirstThisMonth = () => {
  const today = new Date();
  const firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  return firstDateOfMonth;
};

// Calculate previous month's first date
export const getFirstLastMonth = () => {
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  return lastMonth;
};
