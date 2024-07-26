import React from 'react';

export const AbstractContent: React.FC = () => {
  return (
    <p>
      Peer assessment as a form of collaborative learning can encourage students
      to learn actively and improve their learning progress. Previous research
      has demonstrated the potential of systems that integrate peer assessment
      mechanisms. In this project, we designed a variation of computational
      notebooks to support teaching introductory programming in the JupyterLab
      environment. We were particularly interested in enabling instructors to
      share and demonstrate coding in real-time, allowing them to assess
      students’ notebooks at scale while providing real-time feedback, and
      supporting students in collaboratively assessing their code. During
      development, we extracted core functionality into separate libraries to
      enhance reusability, including a React quiz UI component library and a Yjs
      extension for handling normalized data. Additionally, by deploying a
      JupyterHub server, we facilitated multi-user access to the extension,
      enabling comprehensive testing. Last but no least, we evaluated the system
      and reached out for user feedback.
    </p>
  );
};
