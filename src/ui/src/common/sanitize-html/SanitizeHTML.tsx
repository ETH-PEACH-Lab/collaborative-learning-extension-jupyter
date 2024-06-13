import React from 'react';
import DOMPurify from 'dompurify';

type SanitizeHTMLProps = {
  html: string;
};

export const SanitizeHTML: React.FC<SanitizeHTMLProps> = ({
  html
}: SanitizeHTMLProps) => {
  const sanitize = (dirty: string) => ({
    __html: DOMPurify.sanitize(dirty, {
      ADD_ATTR: ['border'],
      FORBID_TAGS: ['style'],
      FORBID_ATTR: ['style'],
      USE_PROFILES: { html: true }
    })
  });
  return <div dangerouslySetInnerHTML={sanitize(html)} />;
};
