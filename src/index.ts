import { ICollaborativeDrive } from '@jupyter/docprovider';

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILayoutRestorer
} from '@jupyterlab/application';

import {
  WidgetTracker,
  IWidgetTracker,
  ICommandPalette
} from '@jupyterlab/apputils';

import { Token } from '@lumino/coreutils';
import { ILauncher } from '@jupyterlab/launcher';
import { PuzzleDocModelFactory } from './model_factory';
import { PuzzleDocWidget } from './widget/widget';
import { PuzzleYDoc } from './model/puzzle_ydoc';
import { PuzzleWidgetFactory } from './widget_factory';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { fileIcon } from '@jupyterlab/ui-components';
import { PuzzleSolutionYDoc } from './model/puzzle_solution_ydoc';
import { IDocumentManager } from '@jupyterlab/docmanager';
export const FACTORY = 'puzzle-editor';
// Export a token so other extensions can require it
export const IPuzzleDocTracker = new Token<IWidgetTracker<PuzzleDocWidget>>(
  'puzzleDocTracker'
);
namespace CommandIDs {
  export const createNew = 'jupyterpuzzle:create-new-puzzle-file';
}

/**
 * Initialization data for the collab_learning_extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'collab_learning_extension:plugin',
  description: 'A Collaborative Learning Extension for Jupyter Notebook',
  autoStart: true,
  requires: [
    ILayoutRestorer,
    IFileBrowserFactory,
    ICommandPalette,
    ILauncher,
    IDocumentManager
  ],
  optional: [ICollaborativeDrive],
  provides: IPuzzleDocTracker,
  activate: (
    app: JupyterFrontEnd,
    restorer: ILayoutRestorer,
    browserFactory: IFileBrowserFactory,
    palette: ICommandPalette,
    launcher: ILauncher,
    docMangager: IDocumentManager,
    drive: ICollaborativeDrive | null
  ) => {
    const user = app.serviceManager.user;
    user.ready.then(() => {
      console.log('Identity:', user.identity);
      console.log('Permissions:', user.permissions);
    });

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
        args: (widget: { context: { path: any } }) => ({
          path: widget.context.path,
          factory: FACTORY
        }),
        name: (widget: { context: { path: any } }) => widget.context.path
      });
    }
    app.commands.addCommand(CommandIDs.createNew, {
      label: 'New Puzzle File',
      caption: 'Create a new Puzzle Playground',
      icon: args => (args['isPalette'] ? undefined : fileIcon),
      execute: async args => {
        const cwd = (args['cwd'] ||
          browserFactory.tracker.currentWidget?.model.path) as string;

        let model = await app.serviceManager.contents.newUntitled({
          path: cwd,
          type: 'file',
          ext: '.puzzle'
        });

        model = await app.serviceManager.contents.save(model.path, {
          ...model,
          format: 'text',
          size: undefined,
          content: '{\n\t"cells": []}'
        });
        // Open the newly created file with the 'Editor'
        return app.commands.execute('docmanager:open', {
          path: model.path,
          factory: FACTORY
        });
      }
    });
    palette.addItem({ command: CommandIDs.createNew, category: '' });
    launcher.add({
      command: CommandIDs.createNew,
      category: 'Other',
      rank: 1
    });
    app.docRegistry.addFileType({
      name: 'puzzle',
      displayName: 'Puzzle',
      mimeTypes: ['text/json', 'application/json'],
      extensions: ['.puzzle'],
      fileFormat: 'text',
      contentType: 'puzzledoc' as any
    });
    app.docRegistry.addFileType({
      name: 'spuzzle',
      displayName: 'Solution Puzzle',
      mimeTypes: ['text/json', 'application/json'],
      extensions: ['.spuzzle'],
      fileFormat: 'text',
      contentType: 'spuzzledoc' as any
    });
    if (drive) {
      const sharedPuzzleSolutionFactory = () => {
        return PuzzleSolutionYDoc.create();
      };
      const sharedPuzzleFactory = () => {
        return PuzzleYDoc.create();
      };
      drive.sharedModelFactory.registerDocumentFactory(
        'puzzledoc',
        sharedPuzzleFactory
      );
      drive.sharedModelFactory.registerDocumentFactory(
        'spuzzledoc',
        sharedPuzzleSolutionFactory
      );
    } else {
      console.error('collaborative mode inactive');
      return;
    }

    // Creating and registering the model factory for our custom DocumentModel
    const modelFactory = new PuzzleDocModelFactory(<
      PuzzleDocModelFactory.IOptions
    >{ docManager: docMangager });
    app.docRegistry.addModelFactory(modelFactory);
    // Creating the widget factory to register it so the document manager knows about
    // our new DocumentWidget
    const widgetFactory = new PuzzleWidgetFactory({
      name: FACTORY,
      modelName: 'puzzle-model',
      fileTypes: ['puzzle'],
      defaultFor: ['puzzle'],
      canStartKernel: true,
      preferKernel: true,
      shutdownOnClose: true,
      autoStartDefault: true
    });
    // Add the widget to the tracker when it's created
    widgetFactory.widgetCreated.connect(
      (sender: any, widget: PuzzleDocWidget) => {
        widget.context.pathChanged.connect(() => {
          tracker.save(widget);
        });
        tracker.add(widget);
      }
    );

    app.docRegistry.addWidgetFactory(widgetFactory);
  }
};

export default plugin;
