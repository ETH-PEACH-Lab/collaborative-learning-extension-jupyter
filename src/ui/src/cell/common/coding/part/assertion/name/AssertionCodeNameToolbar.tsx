import React, { ReactElement } from 'react';
import { BaseButtonProps } from '../../../../../../common';
export type AssertionCodeNameToolbarProps = {
  children: ReactElement<BaseButtonProps> | ReactElement<BaseButtonProps>[];
};
export const AssertionCodeNameToolbar: React.FC<
  AssertionCodeNameToolbarProps
> = ({ children }) => {
  return <>{children}</>;
};
