const Check = (props: { className?: string; fill?: string }) => (
  <svg
    fill="none"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth="0" />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="m351.605 663.268 481.761-481.761c28.677-28.677 75.171-28.677 103.847 0s28.677 75.171 0 103.847L455.452 767.115l.539.539-58.592 58.592c-24.994 24.994-65.516 24.994-90.51 0L85.507 604.864c-28.677-28.677-28.677-75.171 0-103.847s75.171-28.677 103.847 0l162.25 162.25z"
      style={{
        fill: props.fill ?? 'rgb(50, 49, 114)',
      }}
    />
  </svg>
);

export default Check;
