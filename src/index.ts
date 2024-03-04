import { ICollaborativeDrive } from '@jupyter/docprovider';

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILayoutRestorer
} from '@jupyterlab/application';

import {
  WidgetTracker,
  IWidgetTracker,
  SessionContext,
  ISessionContext
} from '@jupyterlab/apputils';

import { Token } from '@lumino/coreutils';

import { PuzzleWidgetFactory, PuzzleDocModelFactory } from './factory';
import { PuzzleDocWidget } from './widget/widget';
import { PuzzleKernelDoc } from './model/puzzle_kernel_doc';

const FACTORY = 'puzzle-editor';
// Export a token so other extensions can require it
export const IPuzzleDocTracker = new Token<IWidgetTracker<PuzzleDocWidget>>(
  'puzzleDocTracker'
);
/**
 * Initialization data for the collab_learning_extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'collab_learning_extension:plugin',
  description: 'A Collaborative Learning Extension for Jupyter Notebook',
  autoStart: true,
  requires: [ILayoutRestorer],
  optional: [ICollaborativeDrive],
  provides: IPuzzleDocTracker,
  activate: (
    app: JupyterFrontEnd,
    restorer: ILayoutRestorer,
    drive: ICollaborativeDrive | null
  ) => {
    console.log('JupyterLab extension collab_learning_extension is activated!');
    // Namespace for the tracker
    const namespace = 'puzzle-documents';
    // Creating the tracker for the document
    const tracker = new WidgetTracker<PuzzleDocWidget>({ namespace });

    // Handle state restoration.
    if (restorer) {
      // When restoring the app, if the document was open, reopen it
      console.log('reopen files');
      restorer.restore(tracker, {
        command: 'docmanager:open',
        args: widget => ({ path: widget.context.path, factory: FACTORY }),
        name: widget => widget.context.path
      });
    }
    app.docRegistry.addFileType({
      name: 'puzzle',
      displayName: 'Puzzle',
      mimeTypes: ['text/json', 'application/json'],
      extensions: ['.puzzle'],
      fileFormat: 'json',
      contentType: 'puzzledoc' as any
    });
    if (drive) {
      const sessionContext: SessionContext = new SessionContext({
        sessionManager: app.serviceManager.sessions,
        specsManager: app.serviceManager.kernelspecs,
        kernelPreference: <ISessionContext.IKernelPreference>{
          autoStartDefault: true,
          shutdownOnDispose: true
        },
        name: 'Puzzle Session Context'
      });
      const sharedPuzzleFactory = () => {
        return PuzzleKernelDoc.create(sessionContext);
      };
      sessionContext
        .initialize()
        .then()
        .catch(reason => {
          console.error(
            `Failed to initialize the session in ExamplePanel.\n${reason}`
          );
        });
      drive.sharedModelFactory.registerDocumentFactory(
        'puzzledoc',
        sharedPuzzleFactory
      );
    } else {
      console.error('collaborative mode inactive');
      return;
    }
    // Creating and registering the model factory for our custom DocumentModel
    const modelFactory = new PuzzleDocModelFactory();
    app.docRegistry.addModelFactory(modelFactory);
    // Creating the widget factory to register it so the document manager knows about
    // our new DocumentWidget
    const widgetFactory = new PuzzleWidgetFactory({
      name: FACTORY,
      modelName: 'puzzle-model',
      fileTypes: ['puzzle'],
      defaultFor: ['puzzle']
    });

    // Add the widget to the tracker when it's created
    widgetFactory.widgetCreated.connect((sender, widget) => {
      // Notify the instance tracker if restore data needs to update.
      widget.context.pathChanged.connect(() => {
        tracker.save(widget);
      });
      tracker.add(widget);
    });

    // Registering the widget factory
    app.docRegistry.addWidgetFactory(widgetFactory);
  }
};

export default plugin;
