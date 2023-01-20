import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';
import React, { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
   'Domingo',
   'Segunda-feira',
   'Terça-feira',
   'Quarta-feira',
   'Quinta-feira',
   'Sexta-feira',
   'Sábado'
]

export const NewHabitForm = () => {
   const [title, setTitle] = useState('');
   const [weekDays, setWeekDays] = useState<number[]>([]);

   async function createNewHabit(e: FormEvent) {

      e.preventDefault();
      if (!title || weekDays.length === 0) return;


      await api.post('habits', {
         title,
         weekDays
      });

      setTitle('');
      setWeekDays([]);
      alert('Habito criado com sucesso!');
   }


   function handleToggleWeekDay(weekDay: number) {
      if (weekDays.includes(weekDay)) {
         const weekDayWithRemovedOne = weekDays.filter(day => day !== weekDay);
         setWeekDays(weekDayWithRemovedOne);
      } else {
         const weekDayWithAddedOne = [...weekDays, weekDay];
         setWeekDays(weekDayWithAddedOne);
      }
   }

   return (
      <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6 ">
         <label htmlFor="title" className="font-semibold leading-tight">
            Qual seu comprometimento?
         </label>

         <input
            id="title"
            type="text"
            placeholder="ex.: Exercícios, domir Bem, etc..."
            className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 "
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
         />

         <label className="font-semibold leading-tight mt-4">
            Qual a recorrência?
         </label>


         <div className="flex flex-col gap-2 mt-3">

            {availableWeekDays.map((weekday, index) => (
               <Checkbox.Root key={weekday}
                  className='flex items-center gap-3 group'
                  checked={weekDays.includes(index)}
                  onCheckedChange={() => handleToggleWeekDay(index)}
               >

                  <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                     <Checkbox.Indicator>
                        <Check size={20} className="text-white" />
                     </Checkbox.Indicator>
                  </div>

                  <span
                     className='text-white leading-tight'>{weekday}</span>
               </Checkbox.Root>
            ))}
         </div>

         <button type="submit" className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500">
            Confirmar!
            <Check size={20} weight="bold" />
         </button>
      </form>
   )
}