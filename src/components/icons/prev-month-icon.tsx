import { SVGProps } from 'react';

const PrevMonthIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.1708 13.825L11.3458 10L15.1708 6.175L13.9958 5L8.99583 10L13.9958 15L15.1708 13.825ZM4.82916 5H6.49583V15H4.82916V5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default PrevMonthIcon;
