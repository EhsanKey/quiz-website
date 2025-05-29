import React from 'react';
import PrevMonthIcon from './icons/prev-month-icon';
import NextMonthIcon from './icons/next-month-Icon';
import { Button } from './ui/button';

type MonthNavigatorProps = {
  onPrevMonth: () => void;
  onNextMonth: () => void;
  currentMonth: string;
};

const MonthNavigator = ({ currentMonth, onNextMonth, onPrevMonth }: MonthNavigatorProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <Button size="icon" variant="ghost">
        <PrevMonthIcon onClick={onPrevMonth} />
      </Button>
      <span className="font-normal text-sm leading-[21px]">{currentMonth}</span>
      <Button size="icon" variant="ghost">
        <NextMonthIcon onClick={onNextMonth} />
      </Button>
    </div>
  );
};

export default MonthNavigator;
