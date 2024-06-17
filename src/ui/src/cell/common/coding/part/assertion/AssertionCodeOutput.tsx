import React from 'react';
import {
  KernelOutputContainer,
  KernelOutputContainerProps
} from '../../../../../kernel';

export const AssertionCodeOutput: React.FC<KernelOutputContainerProps> = (
  props: KernelOutputContainerProps
) => {
  return <KernelOutputContainer {...props} className="ml-9 mt-2" />;
};
