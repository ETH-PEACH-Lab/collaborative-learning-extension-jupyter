import React from 'react';
import ImgUrl from '../../../assets/sus-chart.svg?react';
export const UserFeedbackContent: React.FC = () => {
  return (
    <div>
      During a testing session, several technical issues were identified, and
      potential areas for improvement in both the User Interface and
      collaborative features were highlighted through questionnaires. This is
      reflected in the System Usability Scale (SUS) chart below (Average SUS
      score = 58.92, mean SUS score = 65.00).
      <ImgUrl className="w-full md:w-[75%] m-auto" />
      Despite these challenges, the testing affirmed the extension’s potential.
      Further improvements were made after the testing session based on the
      feedback.
    </div>
  );
};
