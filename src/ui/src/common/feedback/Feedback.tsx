import React from 'react';
import { Markdown } from '../markdown';
type FeedbackProps = {
  className?: string;
  feedbackAsMarkdown: string;
};
export const Feedback: React.FC<FeedbackProps> = ({
  feedbackAsMarkdown,
  className
}) => {
  return (
    <div className={'alert rounded-none border border-[#BBB] ' + className}>
      <Markdown src={feedbackAsMarkdown}></Markdown>
    </div>
  );
};
