import { useState } from 'react';
import './App.css';
import ProjectPage from './project-page/ProjectPage';
import { AbstractContent } from './project-page/part/content/AbstractContent';
import { QuizUiContent } from './project-page/part/content/quiz-ui/QuizUiContent';
import { YjsNormalizedContent } from './project-page/part/content/YjsNormalizedContent';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ProjectPage>
        <ProjectPage.Header />
        <ProjectPage.Page header="Abstract" containerSize="sm" grey>
          <AbstractContent />
        </ProjectPage.Page>
        <ProjectPage.Page header="React Quiz UI Library" containerSize="md">
          <QuizUiContent />
        </ProjectPage.Page>
        <ProjectPage.Page
          header="Yjs extension for normalized data"
          containerSize="md"
          grey
        >
          <YjsNormalizedContent></YjsNormalizedContent>
        </ProjectPage.Page>
      </ProjectPage>
    </>
  );
}

export default App;
