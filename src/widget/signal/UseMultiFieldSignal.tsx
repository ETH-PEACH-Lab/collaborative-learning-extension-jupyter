import React, { useRef } from 'react';
import { IField } from '../../types/schemaTypes';
import UseFieldSignal from './UseFieldSignal';

type UseMultiFieldSignalProps<T extends IField> = {
  children: (fields: T[]) => JSX.Element;
  fields: T[];
};
export default function UseMultiFieldSignal<T extends IField>(
  props: UseMultiFieldSignalProps<T>
) {
  const signaledFields: React.MutableRefObject<T[]> = useRef([]);

  const renderFieldSignals = (fields: T[], index: number = 0): JSX.Element => {
    if(!fields.length){
      return <></>
    }
    const [firstField, ...remainingFields] = fields;
    return (
      <UseFieldSignal field={firstField}>
        {signaledField => {
          if (signaledFields.current.length > index) {
            signaledFields.current.splice(index, 1, signaledField);
          } else {
            signaledFields.current.splice(index, 0, signaledField);
          }
          if (!remainingFields.length) {
            return props.children(signaledFields.current);
          }
          return renderFieldSignals(remainingFields, index + 1);
        }}
      </UseFieldSignal>
    );
  };
  return renderFieldSignals(props.fields);
}
