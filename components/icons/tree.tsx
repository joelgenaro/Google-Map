const Tree = (props: { className?: string }) => (
  <svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    overflow="visible"
    preserveAspectRatio="none"
    viewBox="0 0 24 24"
    width="27"
    height="27"
    {...props}
  >
    <g>
      <path
        id="tree"
        d="M19.66,18.01c0-0.18-0.07-0.35-0.2-0.47l-4.19-4.2h2.38c0.36,0,0.66-0.29,0.67-0.65c0-0.18-0.07-0.35-0.2-0.48  l-4.17-4.2H16c0.36,0,0.66-0.29,0.67-0.65c0-0.18-0.07-0.35-0.2-0.48l-4-4c-0.25-0.26-0.66-0.27-0.92-0.02  c-0.01,0.01-0.01,0.01-0.02,0.02l-4,4C7.27,7.14,7.28,7.57,7.55,7.82C7.67,7.94,7.83,8,8,8.01h2.05l-4.18,4.2  c-0.25,0.27-0.24,0.69,0.03,0.95c0.12,0.11,0.28,0.18,0.44,0.18h2.38l-4.19,4.2c-0.25,0.27-0.24,0.69,0.03,0.95  C4.67,18.6,4.83,18.66,5,18.67h4.81c0,0.12-0.02,0.42-0.06,0.91s-0.06,0.86-0.05,1.13c0,0.17,0.07,0.33,0.19,0.44  c0.12,0.12,0.28,0.18,0.45,0.18h3.33c0.17,0,0.33-0.06,0.45-0.18c0.12-0.11,0.19-0.27,0.19-0.44c0-0.27-0.02-0.64-0.05-1.13  c-0.03-0.49-0.05-0.79-0.06-0.91H19C19.36,18.65,19.65,18.37,19.66,18.01L19.66,18.01z"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
);

export default Tree;
