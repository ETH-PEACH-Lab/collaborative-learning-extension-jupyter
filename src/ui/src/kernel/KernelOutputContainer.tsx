import React, { useId } from 'react';
import { KernelOutput } from './KernelOutput';
import { KernelOutputObject } from './type/KernelOutputObject';

export type KernelOutputContainerProps = {
  objects: KernelOutputObject[];
  className?: string;
  showIndex?: boolean;
};
export const KernelOutputContainer: React.FC<KernelOutputContainerProps> = ({
  objects = [],
  className,
  showIndex = true
}: KernelOutputContainerProps) => {
  const id = useId();
  const outputComponents = objects.map((object, index) => (
    <div className={'flex ' + className} key={id + '-' + index}>
      {showIndex && <span className="pr-2">[{index + 1}]</span>}
      <KernelOutput object={object}></KernelOutput>
    </div>
  ));
  return <div className="flex flex-col space-y-4">{outputComponents}</div>;
};
