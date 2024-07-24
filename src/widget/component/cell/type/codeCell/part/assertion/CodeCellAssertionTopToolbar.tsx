import React from 'react';
import {
  BaseButton,
  hideIcon,
  RightAlignedToolbar,
  runAllIcon,
  showIcon,
  ToolbarButton
} from '../../../../../../../ui';
import { caretLeftIcon, caretRightIcon } from '@jupyterlab/ui-components';
type CodeCellAssertionTopToolbarProps = {
  hideRunAll: boolean;
  onRunAll: () => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  onlyFaulty: boolean;
  setOnlyFaulty: (onlyFaulty: boolean) => void;
};
export const CodeCellAssertionTopToolbar: React.FC<
  CodeCellAssertionTopToolbarProps
> = ({
  hideRunAll,
  onRunAll,
  page,
  setPage,
  totalPages,
  onlyFaulty,
  setOnlyFaulty
}: CodeCellAssertionTopToolbarProps) => {
  return (
    <RightAlignedToolbar className="mt-2">
      <BaseButton
        label="Run All Tests"
        hide={hideRunAll}
        icon={runAllIcon.svgstr}
        onClick={onRunAll}
      />
      <BaseButton
        onClick={() => setOnlyFaulty(!onlyFaulty)}
        icon={onlyFaulty ? showIcon.svgstr : hideIcon.svgstr}
        label={(onlyFaulty ? 'Show' : 'Hide') + ' Successful Tests'}
      />
      <div className="ml-2 flex flex-row">
        <ToolbarButton
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          icon={caretLeftIcon.svgstr}
        />
        <span className="height-[32px] leading-[32px] px-2 height bg-base-200">
          {page + 1} / {totalPages === 0 ? 1 : totalPages}
        </span>
        <ToolbarButton
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages - 1 || totalPages === 0}
          icon={caretRightIcon.svgstr}
        />
      </div>
    </RightAlignedToolbar>
  );
};
