import React from 'react';

export const AbstractContent: React.FC = () => {
  return (
    <p>
      Peer assessment as a form of collaborative learning can encourage students
      to learn actively and improve their learning progress. However, current
      teaching platforms and programming environments offer little support for
      the integration of peer assessment in classroom programming exercises. In
      this project, we aimed to develop a Jupyter notebook extension to make
      computational notebooks more usable and engaging for teaching and learning
      introductory programming. We were particularly interested in supporting
      instructors to share and demonstrate coding to students, allowing
      instructors to assess students’ notebooks at scale, and supporting
      students to collaboratively write and assess their code. During
      development, we extracted core functionality into separate libraries to
      enhance reusability, including a React quiz UI component library and a Yjs
      extension for handling normalized data. Lastly, we evaluated the prototype
      on a multi-user JupyterHub setup and gathered user feedback.
    </p>
  );
};
