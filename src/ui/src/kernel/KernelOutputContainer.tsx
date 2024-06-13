import React from 'react';
import { KernelOutput } from './KernelOutput';
import { KernelOutputObject } from './type/KernelOutputObject';

type KernelOutputContainerProps = {
  objects: KernelOutputObject[];
  showIndex?: boolean;
};
export const KernelOutputContainer: React.FC<KernelOutputContainerProps> = ({
  objects,
  showIndex = true
}: KernelOutputContainerProps) => {
  const outputComponents = objects.map((object, index) => (
    <div className="flex">
      {showIndex && <span className="pr-2">[{index + 1}]</span>}
      <KernelOutput key={index} object={object}></KernelOutput>
    </div>
  ));
  return <div className="flex flex-col space-y-4">{outputComponents}</div>;
};
