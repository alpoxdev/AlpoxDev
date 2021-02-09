export const onGetDateFormat = (dateString: string): string => {
  const date = new Date(dateString);
  if (!date) return '';

  const minutes = date.getMinutes();
  const hour = date.getHours();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let stringMonth = `${month}`;
  let stringDay = `${day}`;
  const stringHour = `${hour}`;
  const stringMinutes = `${minutes}`;

  if (month < 10) stringMonth = `0${month}`;
  if (day < 10) stringDay = `0${day}`;
  //   if (hour < 10) stringHour = `0${hour}`;
  //   if (minutes < 10) stringMinutes = `0${minutes}`;

  return `${year}년 ${stringMonth}월 ${stringDay}일`;
};
