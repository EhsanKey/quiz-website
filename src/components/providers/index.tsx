import React from 'react';
import { ThemeProvider } from './theme-provider';
import { ToastContainer } from 'react-toastify';

const Providers: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <ToastContainer position="top-right" limit={2} autoClose={3000} />
    </ThemeProvider>
  );
};

export default Providers;
