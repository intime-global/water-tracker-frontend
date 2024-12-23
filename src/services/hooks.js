import { format, parse } from 'date-fns';

export const transformTimeToISO = (time) => {
  const currentDate = new Date();
  const parsedTime = parse(time, 'HH:mm', currentDate);
  const formattedDate = format(parsedTime, "yyyy-MM-dd'T'HH:mm:ss");
  return formattedDate;
};

export const transformTimeToHHMM = (time) => {
  const currentDatehh = new Date();
  const parsedTimehh = parse(time, 'HH:mm:ss', currentDatehh);
  const formattedDatehh = format(parsedTimehh, 'HH:mm');
  return formattedDatehh;
};
