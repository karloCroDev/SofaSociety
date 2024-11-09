export const Close: React.FC<React.ComponentPropsWithoutRef<'svg'>> = ({
  ...rest
}) => (
  <svg
    {...rest}
    viewBox="0 0 24 24"
    fill="currentcolor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m18.3537 5.99999-5.2929 5.29291-.3536-.3536 5.2929-5.29286.3536.35355ZM6.00011 5.64644 11.293 10.9393l-.3535.3536-5.29294-5.29291.35355-.35355Zm5.99999 5.99996.3536.3536-.3536.3535L11.6466 12l.3535-.3536Zm.7071 1.4143.3536-.3536L18.3537 18l-.3536.3535-5.2929-5.2928Zm-1.7677-.3536.3535.3536-5.29289 5.2928L5.64656 18l5.29294-5.2929Z"
      stroke="#050505"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);
