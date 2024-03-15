import React, { useContext } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { IMarkdownField } from '../../../../types/cell_types';
import { PuzzleEditorComponent } from '../../util/puzzle_editor_component';
import {
  IUserRoleContext,
  UserRoleContext
} from '../../../context/user_role_context';

type PuzzleMarkdownFieldComponentProps = {
  field: IMarkdownField;
  onChange: (c: IMarkdownField) => void;
};
export function PuzzleMarkDownFieldComponent(
  props: PuzzleMarkdownFieldComponentProps
) {
  const { isInstructor } = useContext(UserRoleContext) as IUserRoleContext;
  const onMarkdownChange = (value: string) => {
    props.field.src = value;
    props.onChange(props.field);
  };
  return (
    <div className="puzzle-field">
      <Markdown remarkPlugins={[remarkGfm]}>{props.field.src}</Markdown>
      {isInstructor && (
        <PuzzleEditorComponent
          code={props.field.src}
          language="markdown"
          onCodeChange={onMarkdownChange}
        ></PuzzleEditorComponent>
      )}
    </div>
  );
}
