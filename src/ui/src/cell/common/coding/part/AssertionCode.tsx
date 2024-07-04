import React, { ReactElement } from 'react';
import {
  Indicator,
  TabProps,
  Tabs,
  Toolbar,
  ToolbarToggle
} from '../../../../common';
export type AssertionCodeProps = {
  onTabChange?: (index: number) => void;
  isInstructor?: boolean;
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
  onlyFaulty?: boolean;
  setOnlyFaulty: (value: boolean) => void;
};
export const AssertionCode: React.FC<AssertionCodeProps> = ({
  isInstructor,
  children,
  onTabChange,
  onlyFaulty,
  setOnlyFaulty
}: AssertionCodeProps) => {
  const ToolbarChild = (
    <Toolbar showOnHover={false}>
      <ToolbarToggle
        onChange={setOnlyFaulty}
        checked={onlyFaulty}
        label="Hide successful tests"
        className="bg-white border-none !shadow-none"
      ></ToolbarToggle>
    </Toolbar>
  );
  return (
    <>
      <Indicator
        label={isInstructor ? 'AssertionCode' : undefined}
        className="mt-6"
      >
        <Tabs onTabChange={onTabChange}>{children}</Tabs>
        {ToolbarChild}
      </Indicator>
    </>
  );
};
