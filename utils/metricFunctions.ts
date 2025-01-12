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

export const cleanSince = (reasons:any) => {
    const dates: Date[] = [];

    reasons &&
      reasons.forEach((item:any) => {
        try {
          if (item?.date) {
            dates.push(new Date(item.date)); // Push valid dates
          }
        } catch (error) {
          console.warn('Invalid JSON:', item); // Log invalid entries
        }
      });
      const mostRecentDate = new Date(
        Math.max(...dates.map((date) => new Date(date).getTime()))
      );
    
      const cleanSince = new Date().getDate() - mostRecentDate.getDate();
      return cleanSince

}
