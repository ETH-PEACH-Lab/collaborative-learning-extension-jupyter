import { useContext } from 'react';
import React from 'react';
import { bugIcon } from '@jupyterlab/ui-components';
import {
  IKernelContext,
  KernelContext
} from '../../../../../context/kernelContext';
import { IKernelTestVerification } from '../../../../../../types/kernelTypes';
import KernelButton from '../../../../util/KernelButton';

type KernelVerifyTestButtonProps = {
  input: IKernelTestVerification;
  additionalLabel?: string;
};
export default function KernelVerifyTestButton(
  props: KernelVerifyTestButtonProps
) {
  const { verifyTest } = useContext(KernelContext) as IKernelContext;

  return (
    <KernelButton
      icon={bugIcon}
      execute={execution =>
        verifyTest({ ...execution, cellId: props.input.cellId })
      }
      input={[props.input]}
      additionalLabel={props.additionalLabel}
    ></KernelButton>
  );
}
