const Location = (props: { className?: string; fill?: string }) => (
  <svg
    fill="none"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth="0" />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      fill="#231F20"
      d="M32 0C18.746 0 8 10.746 8 24c0 5.219 1.711 10.008 4.555 13.93.051.094.059.199.117.289l16 24a4 4 0 0 0 6.656 0l16-24c.059-.09.066-.195.117-.289C54.289 34.008 56 29.219 56 24 56 10.746 45.254 0 32 0m0 32a8 8 0 1 1 0-16 8 8 0 0 1 0 16"
      style={{
        fill: props.fill ?? 'rgb(50, 49, 114)',
        vectorEffect: 'non-scaling-stroke',
      }}
    />
  </svg>
);

export default Location;
