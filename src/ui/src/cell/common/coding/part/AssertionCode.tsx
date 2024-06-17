import React, { ReactElement } from 'react';
import { Indicator, TabProps, Tabs } from '../../../../common';
export type AssertionCodeProps = {
  onTabChange?: (index: number) => void;
  isInstructor?: boolean;
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
};
export const AssertionCode: React.FC<AssertionCodeProps> = ({
  isInstructor,
  children,
  onTabChange
}: AssertionCodeProps) => {
  return (
    <Indicator
      label={isInstructor ? 'AssertionCode' : undefined}
      className="mt-6"
    >
      <Tabs onTabChange={onTabChange}>{children}</Tabs>
    </Indicator>
  );
};
