const List = (props: { className?: string; fill?: string }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g stroke="#020202" />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <g>
      <path
        d="M17.73 11.05h-7.64m7.64 3.81h-7.64m7.64 3.82h-7.64m10.5-12.41V22.5H3.41v-21h12.41z"
        stroke="#020202"
        strokeMiterlimit="10"
        strokeWidth="1.91"
      />
      <path
        d="M20.59 6.27v.96h-5.73V1.5h.96zM6.27 11.05h1.91m-1.91 3.81h1.91m-1.91 3.82h1.91"
        stroke="#020202"
        strokeMiterlimit="10"
        strokeWidth="1.91"
      />
    </g>
  </svg>
);

export default List;
