import React from 'react';
import { SanitizeHTML } from '../util/SanitizeHTML';
import { IKernelOutput } from '../../../types/kernelTypes';
import ReactJson from 'react-json-view';
import { PartialJSONObject } from '@lumino/coreutils';

type KernelOutputComponentProps = {
  output: IKernelOutput;
  disableNoOutput?: boolean;
};

export function KernelOutputComponent(props: KernelOutputComponentProps) {
  if (props.output.type === 'text/html') {
    return <SanitizeHTML html={props.output.output as string}></SanitizeHTML>;
  }
  if (props.output.type === 'application/json') {
    return (
      <ReactJson src={props.output.output as PartialJSONObject}></ReactJson>
    );
  }
  if (props.output.type === 'image/png') {
    return (
      <img
        className="puzzle-field--code-output--image"
        src={('data:image/png;base64,' + props.output.output) as string}
      ></img>
    );
  }
  if (props.output.type === 'error') {
    return (
      <div className="alert alert-danger" style={{ whiteSpace: 'pre-wrap' }}>
        {props.output.output as string}
      </div>
    );
  }
  if (props.output.type === 'clear' && !props.disableNoOutput) {
    return <div className="alert alert-secondary">No output</div>;
  }
  if (props.output.output) {
    <div className="alert alert-secondary" style={{ whiteSpace: 'pre-wrap' }}>
      {props.output.output as string}
    </div>;
  }
  return <></>;
}
