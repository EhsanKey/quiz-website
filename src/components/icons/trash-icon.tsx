import React, { SVGProps } from 'react';

const TrashIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d="M2.5 5.03418H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8333 5.03418V16.7008C15.8333 17.5342 15 18.3675 14.1666 18.3675H5.83329C4.99996 18.3675 4.16663 17.5342 4.16663 16.7008V5.03418"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66663 5.03451V3.36784C6.66663 2.53451 7.49996 1.70117 8.33329 1.70117H11.6666C12.5 1.70117 13.3333 2.53451 13.3333 3.36784V5.03451"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33337 9.20117V14.2012"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6666 9.20117V14.2012"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;
