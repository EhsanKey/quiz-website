'use client';

import Link from 'next/link';
import MonthNavigator from '../month-navigator';
import ThemeSwitcher from '../theme-switcher';
import UserInfo from '../user-info';

const Navbar = () => {
  return (
    <nav className="bg-nav flex items-center justify-between px-6 md:px-10 lg:px-20 h-navbar sticky top-0 z-50 ">
      <Link href="/dashboard" className="leading-[42px] font-bodoni font-bold text-[28px]">
        QUIZ
      </Link>
      <MonthNavigator
        currentMonth="1 February-2024"
        onNextMonth={() => console.log('Next month')}
        onPrevMonth={() => console.log('Previous month')}
      />

      <div className="gap-4 flex items-center justify-between">
        <ThemeSwitcher />
        <UserInfo />
      </div>
    </nav>
  );
};

export default Navbar;
