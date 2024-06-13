import React from 'react';
import CodeCellTabButton from './CodeCellTabButton';
import CodeCellTabContent from './CodeCellTabContent';
import { studentCodeTabModel } from './studentCode/studentCodeTabModel';
import { startingCodeTabModel } from './startingCode/startingCodeTabModel';
import { StartingCode } from './startingCode/StartingCode';
import { solutionCodeTabModel } from './solutionCode/solutionCodeTabModel';
import { SolutionCode } from './solutionCode/SolutionCode';
import { testingCodeTabModel } from './testingCode/testingCodeTabModel';
import { TestingCode } from './testingCode/TestingCode';
import { StudentCode } from './studentCode/StudentCode';

type CodeCellTabsContainerProps = {
  cellId: string;
};
export function CodeCellTabsContainer(props: CodeCellTabsContainerProps) {
  return (
    <div role="tablist" className="tabs tabs-bordered">
      <CodeCellTabButton
        checked={true}
        cellId={props.cellId}
        {...studentCodeTabModel}
      ></CodeCellTabButton>
      <CodeCellTabContent {...studentCodeTabModel} cellId={props.cellId}>
        <StudentCode cellId={props.cellId}></StudentCode>
      </CodeCellTabContent>

      <CodeCellTabButton
        checked={true}
        cellId={props.cellId}
        {...startingCodeTabModel}
      ></CodeCellTabButton>
      <CodeCellTabContent {...startingCodeTabModel} cellId={props.cellId}>
        <StartingCode cellId={props.cellId}></StartingCode>
      </CodeCellTabContent>

      <CodeCellTabButton
        cellId={props.cellId}
        {...solutionCodeTabModel}
      ></CodeCellTabButton>
      <CodeCellTabContent cellId={props.cellId} {...solutionCodeTabModel}>
        <SolutionCode cellId={props.cellId}></SolutionCode>
      </CodeCellTabContent>

      <CodeCellTabButton
        cellId={props.cellId}
        {...testingCodeTabModel}
      ></CodeCellTabButton>
      <CodeCellTabContent cellId={props.cellId} {...testingCodeTabModel}>
        <TestingCode cellId={props.cellId}></TestingCode>
      </CodeCellTabContent>
    </div>
  );
}
