const Video = (props: { className?: string; fill?: string }) => (
  <svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    overflow="visible"
    preserveAspectRatio="none"
    viewBox="0 -32 576 576"
    width="100"
    height="100"
    className="icon flat-line"
    {...props}
  >
    <path
      d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
      style={{ fill: props.fill ?? 'rgb(50, 49, 114)' }}
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default Video;