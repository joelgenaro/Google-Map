const RightArrow = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 14 9" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.241.768a.991.991 0 00-.035 1.254l.035.042L11.884 5 9.241 7.936a.991.991 0 00-.035 1.253l.035.043a.768.768 0 001.167 0l3.439-3.82a.628.628 0 00.03-.784l-.03-.037-3.44-3.823A.766.766 0 009.28.728l-.039.04z"
      fill="currentColor"
    />
    <path
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      d="M7 5H1"
    />
  </svg>
);

export default RightArrow;
