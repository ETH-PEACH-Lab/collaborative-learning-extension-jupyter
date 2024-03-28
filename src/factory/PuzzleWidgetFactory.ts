import { ABCWidgetFactory, DocumentRegistry } from '@jupyterlab/docregistry';
import { PuzzlePanel } from '../widget/PuzzlePanel';
import { PuzzleDocModel } from '../model/puzzleYDoc/PuzzleDocModel';
import PuzzleDocWidget from '../widget/PuzzleDocWidget';

/**
 * A widget factory to create new instances of PuzzleDocWidget.
 */
export default class PuzzleWidgetFactory extends ABCWidgetFactory<
  PuzzleDocWidget,
  PuzzleDocModel
> {
  /**
   * Constructor of PuzzleWidgetFactory.
   *
   * @param options Constructor options
   */
  constructor(options: DocumentRegistry.IWidgetFactoryOptions) {
    console.log('creating factory for puzzle doc');
    super(options);
  }

  /**
   * Create a new widget given a context.
   *
   * @param context Contains the information of the file
   * @returns The widget
   */
  protected createNewWidget(
    context: DocumentRegistry.IContext<PuzzleDocModel>
  ): PuzzleDocWidget {
    return new PuzzleDocWidget({
      context,
      content: new PuzzlePanel(context)
    });
  }
}
