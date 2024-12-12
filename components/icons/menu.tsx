const Menu = (props: { className?: string }) => (
  <svg
    fill="currentColor"
    viewBox="0 0 30 30"
    id="menu"
    data-name="Flat Line"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-line"
    {...props}
  >
    <rect x={12.5} y={6.25} width={13.75} height={2.5} rx={1.25} />
    <rect x={5} y={13.75} width={21.25} height={2.5} rx={1.25} />
    <rect x={12.5} y={21.25} width={13.75} height={2.5} rx={1.25} />
  </svg>
);

export default Menu;
