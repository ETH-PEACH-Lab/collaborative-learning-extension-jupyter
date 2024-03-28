import React, { useContext } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { IMarkdownField } from '../../../types/schemaTypes';
import { EditorComponent } from '../util/EditorComponent';
import {
  IUserRoleContext,
  UserRoleContext
} from '../../context/userRoleContext';

type MarkdownFieldComponentProps = {
  field: IMarkdownField;
  instructorOnly: boolean;
  onChange: (src: string) => void;
};
export function PuzzleMarkDownFieldComponent(
  props: MarkdownFieldComponentProps
) {
  const { isInstructor } = useContext(UserRoleContext) as IUserRoleContext;

  return (
    <>
      <Markdown remarkPlugins={[remarkGfm]}>{props.field.src}</Markdown>
      {((props.instructorOnly && isInstructor) || !props.instructorOnly) && (
        <div className="puzzle-field--markdown-code">
          <EditorComponent
            code={props.field.src}
            language="markdown"
            onCodeChange={props.onChange}
          ></EditorComponent>
        </div>
      )}
    </>
  );
}
