import React, { useState } from 'react';
import CodeCellTabButton from './CodeCellTabButton';
import { StudentCode } from './studentCode/StudentCode';
import { ICodeCell } from '../../../../../../types/schemaTypes';
import CodeCellTabContent from './CodeCellTabContent';
import { studentCodeTabModel } from './studentCode/studentCodeTabModel';
import { startingCodeTabModel } from './startingCode/startingCodeTabModel';
import { StartingCode } from './startingCode/StartingCode';
import { solutionCodeTabModel } from './solutionCode/solutionCodeTabModel';
import { SolutionCode } from './solutionCode/SolutionCode';
import { testingCodeTabModel } from './testingCode/testingCodeTabModel';
import { TestingCode } from './testingCode/TestingCode';

type CodeCellTabsContainerProps = {
  cell: ICodeCell;
};
export function CodeCellTabsContainer(props: CodeCellTabsContainerProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <>
      <ul className="nav nav-tabs" role="tablist">
        <CodeCellTabButton
          cellId={props.cell.id}
          {...studentCodeTabModel}
          activeIndex={activeTabIndex}
          handleTabClick={setActiveTabIndex}
        ></CodeCellTabButton>
        <CodeCellTabButton
          cellId={props.cell.id}
          {...startingCodeTabModel}
          activeIndex={activeTabIndex}
          handleTabClick={setActiveTabIndex}
        ></CodeCellTabButton>
        <CodeCellTabButton
          cellId={props.cell.id}
          {...solutionCodeTabModel}
          activeIndex={activeTabIndex}
          handleTabClick={setActiveTabIndex}
        ></CodeCellTabButton>
        <CodeCellTabButton
          cellId={props.cell.id}
          {...testingCodeTabModel}
          activeIndex={activeTabIndex}
          handleTabClick={setActiveTabIndex}
        ></CodeCellTabButton>
      </ul>
      <div className="tab-content">
        <CodeCellTabContent
          cellId={props.cell.id}
          {...studentCodeTabModel}
          activeIndex={activeTabIndex}
        >
          <StudentCode startingCode={props.cell.startingCode}></StudentCode>
        </CodeCellTabContent>
        <CodeCellTabContent
          cellId={props.cell.id}
          {...startingCodeTabModel}
          activeIndex={activeTabIndex}
        >
          <StartingCode
            cellId={props.cell.id}
            startingCode={props.cell.startingCode}
          ></StartingCode>
        </CodeCellTabContent>
        <CodeCellTabContent
          cellId={props.cell.id}
          {...solutionCodeTabModel}
          activeIndex={activeTabIndex}
        >
          <SolutionCode
            cellId={props.cell.id}
            startingCode={props.cell.startingCode}
            solutionCode={props.cell.solutionCode}
          ></SolutionCode>
        </CodeCellTabContent>
        <CodeCellTabContent
          cellId={props.cell.id}
          {...testingCodeTabModel}
          activeIndex={activeTabIndex}
        >
          <TestingCode
            cellId={props.cell.id}
            startingCode={props.cell.startingCode}
            solutionCode={props.cell.solutionCode}
            testingCode={props.cell.testingCode}
          ></TestingCode>
        </CodeCellTabContent>
      </div>
    </>
  );
}
