import React from 'react';
import { Feedback } from './Feedback';
type InstructorCommentProps = {
  comment?: string;
};
export const InstructorComment: React.FC<InstructorCommentProps> = ({
  comment
}) => {
  return comment && comment !== '' ? (
    <Feedback
      feedbackAsMarkdown={'Instructor comment: ' + comment}
      className="mt-4"
    />
  ) : (
    <></>
  );
};
