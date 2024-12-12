import { SVGProps } from 'react';

const EarthquakeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={64}
    height={64}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.612 2.214a1.01 1.01 0 0 0-1.242 0L1 13.419l1.243 1.572L4 13.621V26a2.004 2.004 0 0 0 2 2h20a2.004 2.004 0 0 0 2-2V13.63L29.757 15 31 13.428ZM6 12.062l9-7.012v7.364l3.458 3.458-6.734 4.81L14.382 26H6ZM26 26h-9.382l-2.342-4.683 7.266-5.19L17 11.587V5.052l9 7.02Z" />
    <path
      data-name="&lt;Transparent Rectangle&gt;"
      style={{
        fill: 'none',
      }}
      d="M0 0h32v32H0z"
    />
  </svg>
);

export default EarthquakeIcon;