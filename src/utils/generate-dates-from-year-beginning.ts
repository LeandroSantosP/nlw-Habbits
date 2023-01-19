import dayjs from 'dayjs';

export const generateDatesFromYearBeginning = () => {
   const fristDayOfTheYear = dayjs().startOf('year');
   const today = new Date();

   const dates = [];
   let compareDate = fristDayOfTheYear;

   while (compareDate.isBefore(today)) {
      dates.push(compareDate.toDate())
      compareDate = compareDate.add(1, 'day');
   }

   return dates;
}