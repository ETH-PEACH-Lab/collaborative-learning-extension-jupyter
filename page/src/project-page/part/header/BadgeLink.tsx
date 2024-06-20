import React from 'react';
type BadgeLinkProps = {
  href: string;
  label: string;
  children?: React.ReactNode;
};
export const BadgeLink: React.FC<BadgeLinkProps> = ({
  href,
  label,
  children
}: BadgeLinkProps) => {
  return (
    <a href={href} target="_blank">
      <div className="hover:underline badge badge-neutral badge-lg p-4">
        <span className="pr-1">{children}</span> {label}
      </div>
    </a>
  );
};
