import React from 'react';
import {
  BaseButton,
  hideIcon,
  RightAlignedToolbar,
  runAllIcon,
  showIcon,
  ToolbarButton
} from '../../../../../../src/ui';
import { caretLeftIcon, caretRightIcon } from '@jupyterlab/ui-components';

type CodingAssertionTopToolbarProps = {
  onlyFaulty: boolean;
  setOnlyFaulty: (onlyFaulty: boolean) => void;
};
export const CodingAssertionTopToolbar: React.FC<
  CodingAssertionTopToolbarProps
> = ({ onlyFaulty, setOnlyFaulty }) => {
  return (
    <RightAlignedToolbar className="mt-4">
      <BaseButton
        label="Run All Tests"
        hide={false}
        icon={runAllIcon.svgstr}
        onClick={() => {}}
      />
      <BaseButton
        onClick={() => setOnlyFaulty(!onlyFaulty)}
        icon={onlyFaulty ? showIcon.svgstr : hideIcon.svgstr}
        label={(onlyFaulty ? 'Show' : 'Hide') + ' Successful Tests'}
      />
      <div className="ml-2 flex flex-row">
        <ToolbarButton
          onClick={() => {}}
          disabled={true}
          icon={caretLeftIcon.svgstr}
        />
        <span className="height-[32px] leading-[32px] px-2 height bg-base-200">
          1/1
        </span>
        <ToolbarButton
          onClick={() => {}}
          disabled={true}
          icon={caretRightIcon.svgstr}
        />
      </div>
    </RightAlignedToolbar>
  );
};
