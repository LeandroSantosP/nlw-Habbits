import { HabbitDay } from "./HabbitDay";

export const SummaryTable = () => {
   const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

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
            <HabbitDay />
            <HabbitDay />
            <HabbitDay />
            <HabbitDay />
            <HabbitDay />
            <HabbitDay />
            <HabbitDay />
            <HabbitDay />
            <HabbitDay />

         </div>
      </div>
   )
}