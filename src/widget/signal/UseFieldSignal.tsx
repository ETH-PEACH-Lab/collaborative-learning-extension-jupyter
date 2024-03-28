import { UseSignal } from '@jupyterlab/ui-components';
import { useContext } from 'react';
import { DocModelContext, IDocModelContext } from '../context/docModelContext';
import { IField } from '../../types/schemaTypes';
import React from 'react';

type UseFieldSignalProps<T extends IField> = {
  children: (field: T) => JSX.Element;
  field: T;
};
export default function UseFieldSignal<T extends IField>(
  props: UseFieldSignalProps<T>
) {
  const { fieldSignal, shouldUpdateField } = useContext(
    DocModelContext
  ) as IDocModelContext;
  return (
    <UseSignal
      signal={fieldSignal}
      initialArgs={props.field}
      shouldUpdate={shouldUpdateField(props.field.id)}
    >
      {(_: any, field: IField | undefined) => (
        <>{field && props.children(field as T)}</>
      )}
    </UseSignal>
  );
}
