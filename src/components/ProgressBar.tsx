import React from 'react';
import Link from 'next/link';

interface ProgressBarLinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  title?: string;
}
export function ProgressBarLink({ href, children, className, title, ...rest }: ProgressBarLinkProps) {
  return (
    <Link title={title} href={href} prefetch={true} {...rest} className={className}>
      {children}
    </Link>
  );
}
