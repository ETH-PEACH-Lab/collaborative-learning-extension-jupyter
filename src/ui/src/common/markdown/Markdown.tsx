import React from 'react';
import { MarkdownComponent } from 'react-quiz-ui';
import { MarkdownConfig } from './MarkdownConfig';
type MarkdownProps = {
  src: string;
};
export const Markdown: React.FC<MarkdownProps> = (props: MarkdownProps) => {
  return <MarkdownComponent src={props.src} config={MarkdownConfig} />;
};
