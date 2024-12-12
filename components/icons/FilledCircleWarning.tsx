import { forwardRef } from 'react';

const FilledCircleWarning = forwardRef<
  SVGSVGElement,
  { className?: string; fill?: string }
>((props, ref) => {
  return (
    <svg
      fill="none"
      {...props}
      ref={ref}
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      overflow="visible"
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
      width="20"
      height="20"
    >
      <g>
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          style={{
            fill: props.fill ?? 'rgb(14, 41, 35)',
          }}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
});

export default FilledCircleWarning;
