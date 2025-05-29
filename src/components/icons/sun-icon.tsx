import { SVGProps } from 'react';

const SunIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z"
        fill="currentColor"
      />
      <path d="M9 1.5V3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 15V16.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M3.69751 3.69727L4.75501 4.75477"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.245 13.2451L14.3025 14.3026"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M1.5 9H3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 9H16.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M4.75501 13.2451L3.69751 14.3026"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.3025 3.69727L13.245 4.75477"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SunIcon;
