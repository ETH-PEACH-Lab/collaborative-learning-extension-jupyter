import { ISignal } from '@lumino/signaling';
import { languages } from 'monaco-editor';

export class LanguageCompleter {
  constructor(signal: ISignal<any, any> | null) {
    this._registerCompletionItemProvider();
    if (signal !== null) {
      signal.connect(this._handleSuggestions.bind(this));
    }
  }
  _registerCompletionItemProvider() {
    languages.registerCompletionItemProvider('python', {
      triggerCharacters:
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.\\@('.split(''),
      provideCompletionItems(model, position, context, token) {
        const suggestions = ['keyword1', 'keyword2', 'keyword3'].map(
          keyword => ({
            label: keyword,
            kind: languages.CompletionItemKind
              .Keyword as languages.CompletionItemKind,
            insertText: keyword,
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column + keyword.length
            }
          })
        );
        return { suggestions: suggestions };
      }
    });
  }

  private _handleSuggestions() {}
}
