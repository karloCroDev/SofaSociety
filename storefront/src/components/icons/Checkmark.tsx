export const Checkmark: React.FC<React.ComponentPropsWithoutRef<'svg'>> = ({
  ...rest
}) => (
  <svg
    {...rest}
    viewBox="0 0 24 24"
    fill="currentcolor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.35367 16.9482 20.0001 6.30177l.3536.35356L9.17689 17.8321c-.09763.0976-.25592.0976-.35355 0l-5.17678-5.1768.35355-.3535 4.64645 4.6464c.09377.0938.22095.1465.35355.1465.13261 0 .25979-.0527.35356-.1465Z"
      stroke="currentcolor"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);
