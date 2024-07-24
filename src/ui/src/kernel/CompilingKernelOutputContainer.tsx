import React from 'react';
import {
  KernelOutputContainer,
  KernelOutputContainerProps
} from './KernelOutputContainer';
type CompilingKernelOutputContainerProps = KernelOutputContainerProps & {
  isCompiling: boolean;
  classNameCompilingHint?: string;
};
export const CompilingKernelOutputContainer: React.FC<
  CompilingKernelOutputContainerProps
> = (props: CompilingKernelOutputContainerProps) => {
  return (
    <>
      <span className={props.classNameCompilingHint}>
        {props.objects &&
          props.objects.filter(item => item.type === 'error').length === 0 &&
          !props.isCompiling && (
            <span className="text-green-800 text-xs">
              Compiled successfully
            </span>
          )}
        {props.isCompiling && <span className="text-xs">Compiling...</span>}
      </span>
      <KernelOutputContainer {...props}></KernelOutputContainer>
    </>
  );
};
