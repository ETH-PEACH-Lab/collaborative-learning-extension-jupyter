import React from 'react';
import { BaseButton } from '../../../../../../src/ui';
import { checkIcon, deleteIcon, runIcon } from '@jupyterlab/ui-components';

type CodingAssertionCodeNameToolbarProps = {
  verified?: boolean;
};
export const CodingAssertionCodeNameToolbar: React.FC<
  CodingAssertionCodeNameToolbarProps
> = ({ verified }) => {
  return (
    <>
      <BaseButton
        hide={!verified}
        onClick={() => {}}
        icon={runIcon.svgstr}
        label="Run"
      ></BaseButton>
      <BaseButton
        hide={verified}
        onClick={() => {}}
        icon={checkIcon.svgstr}
        label="Verify"
      />
      <BaseButton
        hide={verified}
        onClick={() => {}}
        icon={deleteIcon.svgstr}
        label="Delete"
      />
    </>
  );
};
