'use client';

// External packages
import * as React from 'react';

export const HeaderWrapper: React.FC<{
  children: React.ReactNode;
  colorScheme?: string;
}> = ({ children, colorScheme = 'light' }) => {
  const headerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const themeCheckerFn = () => {
      const element = headerRef.current;
      if (element && colorScheme === 'light') {
        element.toggleAttribute(
          'data-dark-theme',
          window.scrollY <= window.innerHeight * 0.7
        );
      }
    };
    themeCheckerFn();

    window.addEventListener('scroll', () => {
      themeCheckerFn();
    });
    window.addEventListener('orientationchange', () => {
      themeCheckerFn();
    });
    window.addEventListener('resize', () => {
      themeCheckerFn();
    });

    return () => {
      window.removeEventListener('scroll', themeCheckerFn);
      window.removeEventListener('orientationchange', themeCheckerFn);
      window.removeEventListener('resize', themeCheckerFn);
    };
  }, [colorScheme]);

  return (
    <>
      <div
        className="fixed left-0 top-0 z-10 w-full bg-gray-10 text-gray-900 lg:data-[dark-theme]:bg-transparent lg:data-[dark-theme]:text-gray-10"
        ref={headerRef}
      >
        {children}
      </div>
    </>
  );
};
