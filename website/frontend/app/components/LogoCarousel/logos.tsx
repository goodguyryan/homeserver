import { ReactNode } from "react";

export interface Logo {
  id: string;
  name: string;
  href?: string;
  ariaLabel: string;
  svg: ReactNode;
}

export const logos: Logo[] = [
  {
    id: "1",
    name: "Logo 1",
    ariaLabel: "Logo 1",
    svg: (
      <svg
        className="h-[25px] w-[25px]"
        fill="none"
        viewBox="0 0 48 48"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <rect x={4} y={4} width={40} height={40} rx={4} />
        <path d="M14 18h20M14 24h20M14 30h10" />
      </svg>
    ),
  },
  {
    id: "2",
    name: "Logo 2",
    ariaLabel: "Logo 2",
    svg: (
      <svg
        className="h-[25px] w-[25px]"
        fill="none"
        viewBox="0 0 48 48"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <circle cx={24} cy={24} r={20} />
        <path d="M24 18v12M18 24h12" />
      </svg>
    ),
  },
  {
    id: "3",
    name: "Logo 3",
    ariaLabel: "Logo 3",
    svg: (
      <svg
        className="h-[25px] w-[25px]"
        fill="none"
        viewBox="0 0 48 48"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M24 4L4 14v20l20 10 20-10V14L24 4z"
        />
        <path d="M24 14v20M14 19l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "4",
    name: "Logo 4",
    ariaLabel: "Logo 4",
    svg: (
      <svg
        className="h-[25px] w-[25px]"
        fill="none"
        viewBox="0 0 48 48"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M24 41.5C14.5 34.5 4 26.5 4 16C4 10.5 8.5 6.5 14 6.5C18 6.5 21.5 9 24 12.5C26.5 9 30 6.5 34 6.5C39.5 6.5 44 10.5 44 16C44 26.5 33.5 34.5 24 41.5Z"
        />
      </svg>
    ),
  },
  {
    id: "5",
    name: "Logo 5",
    ariaLabel: "Logo 5",
    svg: (
      <svg
        className="h-[25px] w-[25px]"
        fill="none"
        viewBox="0 0 48 48"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M24 4L30 18H45L33 27L37 42L24 33L11 42L15 27L3 18H18L24 4Z"
        />
      </svg>
    ),
  },
];
