import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabbitDay } from "./HabbitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDatesFromYearBeginning();
const minumoSummaryDatesSize = 18 * 7 // 18 weeks

type summayProps = Array<{
   id: string;
   date: string;
   amount: number;
   completed: number;
}>

export const SummaryTable = () => {
   const [summary, setSummary] = useState<summayProps>([]);

   const amountOfDaysOfFill = minumoSummaryDatesSize - summaryDates.length;

   useEffect(() => {
      api.get('summary').then(response => setSummary(response.data));
   }, []);

   return (
      <div className="w-full flex">
         <div className="grid grid-rows-7 grid-flow-row gap-3">
            {weekDays.map((weekDay, index) => (
               <div
                  key={index}
                  className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
               >
                  {weekDay}
               </div>
            ))}
         </div>

         <div className="grid grid-rows-7 grid-flow-col gap-3 ">
            {summary.length > 0 && summaryDates.map(date => {
               const dayInSummary = summary.find(day => {
                  return dayjs(date).isSame(day.date, 'day')
               })

               return (
                  <HabbitDay
                     key={date.toString()}
                     date={date}
                     amount={dayInSummary?.amount}
                     defaultCompleted={dayInSummary?.completed}
                  />
               )
            })}
            {amountOfDaysOfFill > 0 && Array.from({ length: amountOfDaysOfFill }).map((_, i) => {
               return <div
                  key={i}
                  className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
            })}
         </div>
      </div>
   )
}