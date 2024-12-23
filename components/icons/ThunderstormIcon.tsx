import { SVGProps } from 'react';

const ThunderstormIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={64}
    height={64}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 30a1 1 0 0 1-.894-1.447l2-4a1 1 0 1 1 1.788.894l-2 4A1 1 0 0 1 21 30M9 32a1 1 0 0 1-.894-1.447l2-4a1 1 0 1 1 1.788.894l-2 4A1 1 0 0 1 9 32m6.901-1.504-1.736-.992L17.31 24h-6l4.855-8.496 1.736.992L14.756 22h6.001z" />
    <path d="M24.8 9.136a8.994 8.994 0 0 0-17.6 0 6.493 6.493 0 0 0 .23 12.768l-1.324 2.649a1 1 0 1 0 1.789.894l2-4a1 1 0 0 0-.447-1.341A1 1 0 0 0 9 20.01V20h-.5a4.498 4.498 0 0 1-.356-8.981l.816-.064.099-.812a6.994 6.994 0 0 1 13.883 0l.099.812.815.064A4.498 4.498 0 0 1 23.5 20H23v2h.5a6.497 6.497 0 0 0 1.3-12.864" />
    <path
      data-name="&lt;Transparent Rectangle&gt;"
      style={{
        fill: 'none',
      }}
      d="M0 0h32v32H0z"
    />
  </svg>
);

export default ThunderstormIcon;
