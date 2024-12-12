const Request = (props: { className?: string; fill?: string }) => (
  <svg
    fill="none"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth="0" />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M22 22v6H6V4h10V2H6a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6Z"
      style={{
        fill: props.fill ?? 'rgb(50, 49, 114)',
      }}
    />
    <path
      d="m29.54 5.76-3.3-3.3a1.6 1.6 0 0 0-2.24 0l-14 14V22h5.53l14-14a1.6 1.6 0 0 0 0-2.24ZM14.7 20H12v-2.7l9.44-9.45 2.71 2.71ZM25.56 9.15l-2.71-2.71 2.27-2.27 2.71 2.71Z"
      style={{
        fill: props.fill ?? 'rgb(50, 49, 114)',
      }}
    />
  </svg>
);

export default Request;
