import React from 'react';

import { JsonView, defaultStyles } from 'react-json-view-lite';
import { SanitizeHTML } from '../common';
import { KernelOutputObject } from './type/KernelOutputObject';

const OutputComponents: {
  [key: string]: React.FC<{ output: string | object }>;
} = {
  'text/html': ({ output }) => <SanitizeHTML html={output as string} />,
  'application/json': ({ output }) => (
    <JsonView
      data={output as object}
      style={{
        ...defaultStyles,
        container: 'bg-base-100'
      }}
    />
  ),
  'image/png': ({ output }) => <img src={`data:image/png;base64,${output}`} />,
  error: ({ output }) => (
    <div
      className="alert alert-error rounded-none"
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {output as string}
    </div>
  ),
  default: ({ output }) => (
    <div
      className="alert alert-base-200 rounded-none"
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {output as string}
    </div>
  )
};
type KernelOutputProps = {
  object: KernelOutputObject;
};
export const KernelOutput: React.FC<KernelOutputProps> = ({
  object
}: KernelOutputProps) => {
  const OutputComponent =
    OutputComponents[object.type] || OutputComponents['default'];
  return object.output ? <OutputComponent output={object.output} /> : <></>;
};
