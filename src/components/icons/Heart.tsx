export const Heart: React.FC<React.ComponentPropsWithoutRef<'svg'>> = ({
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
      d="M3.08058 3.92525C4.25269 2.75315 5.8424 2.09467 7.5 2.09467c.95514 0 1.81239.13638 2.647.49988.6434.28025 1.2454.68332 1.853 1.21987.6076-.53655 1.2096-.93962 1.853-1.21987.8346-.3635 1.6919-.49988 2.647-.49988 1.6576 0 3.2473.65848 4.4194 1.83058 1.1721 1.1721 1.8306 2.76181 1.8306 4.41942 0 2.62893-1.7346 4.57493-3.2224 6.03303L12 21.9053l-7.52586-7.5258C2.97096 12.9258 1.25 10.9818 1.25 8.34467c0-1.65761.65848-3.24732 1.83058-4.41942ZM7.5 3.59467c-1.25978 0-2.46796.50044-3.35876 1.39124C3.25045 5.87671 2.75 7.08489 2.75 8.34467c0 1.96013 1.27553 3.51483 2.77127 4.96073l.00914.0089L12 19.784l6.4751-6.4751c1.4916-1.4616 2.7749-3.0148 2.7749-4.96423 0-1.25978-.5004-2.46796-1.3912-3.35876S17.7598 3.59467 16.5 3.59467c-.8049 0-1.4476.11361-2.048.37511-.6053.26361-1.2144.69796-1.9217 1.40522L12 5.90533l-.5303-.53033c-.7073-.70726-1.3164-1.14161-1.92168-1.40522-.60041-.2615-1.24316-.37511-2.04802-.37511Z"
      fill="currentcolor"
    />
  </svg>
);