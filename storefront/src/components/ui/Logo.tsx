// External packages
import Link from 'next/link';

export const Logo: React.FC<React.ComponentPropsWithoutRef<'a'>> = ({
  ...rest
}) => {
  return (
    <Link {...rest} href="/">
      <h1 className="text-lg font-medium">SofaSocietyCo.</h1>
    </Link>
  );
};
