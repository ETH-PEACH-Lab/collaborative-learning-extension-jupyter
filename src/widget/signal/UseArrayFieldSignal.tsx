import { useContext } from 'react';
import {
  ArrayFieldProperty,
  IArrayFieldSignaling,
  IField
} from '../../types/schemaTypes';
import { DocModelContext, IDocModelContext } from '../context/docModelContext';
import { UseSignal } from '@jupyterlab/ui-components';
import React from 'react';

type UseFieldSignalProps<T extends IField> = {
  children: (fields: T[]) => JSX.Element;
  fields: T[];
  propertyName: ArrayFieldProperty;
};
export default function UseArrayFieldSignal<T extends IField>(
  props: UseFieldSignalProps<T>
) {
  const { arrayFieldSignal, shouldUpdateArrayField } = useContext(
    DocModelContext
  ) as IDocModelContext;
  return (
    <UseSignal
      signal={arrayFieldSignal}
      initialArgs={{ propertyName: props.propertyName, fields: props.fields }}
      shouldUpdate={shouldUpdateArrayField(props.propertyName)}
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
