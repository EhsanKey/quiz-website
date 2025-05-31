import { SVGProps } from 'react';

const PlusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_34_2865)">
        <path
          d="M10 18.3337C14.6024 18.3337 18.3334 14.6027 18.3334 10.0003C18.3334 5.39795 14.6024 1.66699 10 1.66699C5.39765 1.66699 1.66669 5.39795 1.66669 10.0003C1.66669 14.6027 5.39765 18.3337 10 18.3337Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 6.66699V13.3337"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66669 10H13.3334"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_34_2865">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PlusIcon;
