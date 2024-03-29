import { useContext } from 'react';
import {
  ArrayFieldProperty,
  IArrayFieldSignaling,
  IField
} from '../../types/schemaTypes';
import { DocModelContext, IDocModelContext } from '../context/docModelContext';
import { UseSignal } from '@jupyterlab/ui-components';
import React from 'react';

type UseArrayFieldSignalProps<T extends IField> = {
  parentId: string;
  children: (fields: T[]) => JSX.Element;
  fields: T[];
  propertyName: ArrayFieldProperty;
};
export default function UseArrayFieldSignal<T extends IField>(
  props: UseArrayFieldSignalProps<T>
) {
  const { arrayFieldSignal, shouldUpdateArrayField } = useContext(
    DocModelContext
  ) as IDocModelContext;
  return (
    <UseSignal
      signal={arrayFieldSignal}
      initialArgs={{
        parentId: props.parentId,
        propertyName: props.propertyName,
        fields: props.fields
      }}
      shouldUpdate={shouldUpdateArrayField(props.parentId, props.propertyName)}
    >
      {(_: any, arrayFieldSignaling: IArrayFieldSignaling | undefined) => (
        <>
          {arrayFieldSignaling &&
            props.children(arrayFieldSignaling?.fields as T[])}
        </>
      )}
    </UseSignal>
  );
}
