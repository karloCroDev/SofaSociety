export const Chevron: React.FC<React.ComponentPropsWithoutRef<'svg'>> = ({
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
      d="M5.46973 9.26516 6.53039 8.2045l5.46971 5.4697 5.4696-5.4697 1.0607 1.06066-6.5303 6.53034-6.53037-6.53034Z"
      fill="currentcolor"
    />
  </svg>
);
