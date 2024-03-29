import React from 'react';
import { SanitizeHTML } from '../../util/puzzle_sanitize_html_component';
import { KernelOutput } from '../../../../types/output_types';
import ReactJson from 'react-json-view';
import { PartialJSONObject } from '@lumino/coreutils';

type PuzzleCodeOutputFieldComponentProps = {
  output: KernelOutput;
};

export function PuzzleCodeOutputFieldComponent(
  props: PuzzleCodeOutputFieldComponentProps
) {
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
  return (
    <div className="alert alert-secondary" style={{ whiteSpace: 'pre-wrap' }}>
      {props.output.output as string}
    </div>
  );
}
