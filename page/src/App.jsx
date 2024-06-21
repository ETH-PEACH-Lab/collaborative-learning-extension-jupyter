import './App.css';
import ProjectPage from './project-page/ProjectPage';
import { AbstractContent } from './project-page/part/content/AbstractContent';
import { QuizUiContent } from './project-page/part/content/quiz-ui/QuizUiContent';
import { YjsNormalizedContent } from './project-page/part/content/YjsNormalizedContent';
import { UserFeedbackContent } from './project-page/part/content/UserFeedbackContent';
import { JupyterNotebookExtensionContent } from './project-page/part/content/jupyter-extension/JupyterNotebookExtensionContent';
function App() {
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
        <ProjectPage.Page
          containerSize="md"
          header="Jupyter Notebook extension"
        >
          <JupyterNotebookExtensionContent />
        </ProjectPage.Page>
        <ProjectPage.Page containerSize="md" grey header="User Feedback Data">
          <UserFeedbackContent />
        </ProjectPage.Page>
      </ProjectPage>
    </>
  );
}

export default App;
