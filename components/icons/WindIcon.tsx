import { SVGProps } from 'react';

const WindIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={64}
    height={64}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 30a5.006 5.006 0 0 1-5-5h2a3 3 0 1 0 3-3H4v-2h9a5 5 0 0 1 0 10" />
    <path d="M25 25a5.006 5.006 0 0 1-5-5h2a3 3 0 1 0 3-3H2v-2h23a5 5 0 0 1 0 10m-4-13H6v-2h15a3 3 0 1 0-3-3h-2a5 5 0 1 1 5 5" />
    <path
      data-name="&lt;Transparent Rectangle&gt;"
      style={{
        fill: 'none',
      }}
      d="M0 0h32v32H0z"
    />
  </svg>
);
export default WindIcon;
