export const Info: React.FC<React.ComponentPropsWithoutRef<'svg'>> = ({
  ...rest
}) => (
  <svg
    {...rest}
    viewBox="0 0 24 24"
    fill="currentcolor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2.25c-5.38478 0-9.75 4.36522-9.75 9.75 0 5.3848 4.36522 9.75 9.75 9.75 5.3848 0 9.75-4.3652 9.75-9.75 0-5.38478-4.3652-9.75-9.75-9.75ZM1.75 12C1.75 6.33908 6.33908 1.75 12 1.75c5.6609 0 10.25 4.58908 10.25 10.25 0 5.6609-4.5891 10.25-10.25 10.25-5.66092 0-10.25-4.5891-10.25-10.25Zm10.5-.25v4.5h-.5v-4.5h.5Zm-.5-4h.51v.5h-.51v-.5Z"
      stroke="currentcolor"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);
