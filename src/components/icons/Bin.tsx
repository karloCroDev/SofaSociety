export const Bin: React.FC<React.ComponentPropsWithoutRef<'svg'>> = ({
  ...rest
}) => (
  <svg
    {...rest}
    viewBox="0 0 24 24"
    fill="currentcolor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.75 17.75v-7.5h-1.5v7.5h1.5ZM14.75 17.75h-1.5v-7.5h1.5v7.5Z"
      fill="currentcolor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.25 5.25V4c0-.74392.36441-1.42507.84467-1.90533C8.57493 1.61441 9.25608 1.25 10 1.25h4c.7439 0 1.4251.36441 1.9053.84467.4803.48026.8447 1.16141.8447 1.90533v1.25h5v1.5h-2V20c0 .7439-.3644 1.4251-.8447 1.9053-.4802.4803-1.1614.8447-1.9053.8447H7c-.74392 0-1.42507-.3644-1.90533-.8447C4.61441 21.4251 4.25 20.7439 4.25 20V6.75h-2v-1.5h5Zm1.5 0V4c0-.25608.13559-.57493.40533-.84467C9.42507 2.88559 9.74392 2.75 10 2.75h4c.2561 0 .5749.13559.8447.40533.2697.26974.4053.58859.4053.84467v1.25h-6.5Zm-3 1.5V20c0 .2561.13559.5749.40533.8447.26974.2697.58859.4053.84467.4053h10c.2561 0 .5749-.1356.8447-.4053.2697-.2698.4053-.5886.4053-.8447V6.75H5.75Z"
      fill="currentcolor"
    />
  </svg>
);