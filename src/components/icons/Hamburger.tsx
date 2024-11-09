export const Hamburger: React.FC<React.ComponentPropsWithoutRef<'svg'>> = ({
  ...rest
}) => (
  <svg
    {...rest}
    viewBox="0 0 24 24"
    fill="currentcolor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.25 5.09467h19.5v1.5H2.25v-1.5Zm0 6.00003h19.5v1.5H2.25v-1.5Zm0 6h19.5v1.5H2.25v-1.5Z"
      fill="currentcolor"
    />
  </svg>
);
