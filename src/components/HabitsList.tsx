import React, { useEffect, useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { api } from '../lib/axios';
import dayjs from 'dayjs';

interface HabitListProps {
   date: Date;
   onCompleteChange: (completed: number) => void;
}

interface HabitsInfos {
   possibleHabits: Array<{
      id: string;
      title: string;
      created_at: string;
   }>;
   completedHabits: string[];
}

export const HabitsList = ({ date, onCompleteChange }: HabitListProps) => {
   const [habitsInfos, setHabitsInfos] = useState<HabitsInfos>();

   useEffect(() => {
      api.get('day', {
         params: {
            date: date.toISOString(),
         }
      }).then(response => {
         setHabitsInfos(response.data);
      })
   }, []);

   const isDateInPast = dayjs(date)
      .endOf('day').isBefore(new Date());


   async function handleToggleHabit(HabitId: string) {
      await api.patch(`/habits/${HabitId}/toggle`);

      const isHabitAlreadyCompleted = habitsInfos!.completedHabits.includes(HabitId);

      let completedHabits: string[] = []

      if (isHabitAlreadyCompleted) {
         completedHabits = habitsInfos!.completedHabits.filter(id => id !== HabitId);
      } else {
         completedHabits = [...habitsInfos!.completedHabits, HabitId]
      }
      setHabitsInfos({
         possibleHabits: habitsInfos!.possibleHabits,
         completedHabits,
      })

      onCompleteChange(completedHabits.length)
   }


   return (
      <div className='mt-5 flex flex-col gap-3'>

         {habitsInfos?.possibleHabits.map(habit => {
            return (
               <Checkbox.Root
                  checked={habitsInfos.completedHabits.includes(habit.id)}
                  disabled={isDateInPast}
                  onCheckedChange={() => handleToggleHabit(habit.id)}
                  key={habit.id}
                  className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'>

                  <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500  transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                     <Checkbox.Indicator>
                        <Check size={20} className="text-white" />
                     </Checkbox.Indicator>
                  </div>
                  <span
                     className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>{habit.title}</span>
               </Checkbox.Root>
            )
         })}
      </div>
   )
}
