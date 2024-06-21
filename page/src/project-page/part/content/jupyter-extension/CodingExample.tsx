import React from 'react';
import {
  AssertionCodeTab,
  CellDescription,
  Coding,
  Content,
  ContentBody,
  ToolbarButton,
  runAllIcon
} from '../../../../../../src/ui';
import { checkIcon, deleteIcon, runIcon } from '@jupyterlab/ui-components';

export const CodingExample: React.FC = () => {
  return (
    <Content>
      <ContentBody>
        <div className="pt-4 pb-4">
          <CellDescription
            isInstructor={false}
            src="Provide code to calculate factorial of n, where is n a natural number, if n <= 0 return 1"
            onChange={() => {}}
          />
        </div>

        <Coding>
          <Coding.StartingCode
            src="def factorial(n):"
            language="python"
            readonly={true}
            onChange={() => {}}
          />
          <Coding.StudentCode
            src="# Your code here
    if n == 0 or n == 1:
        return 1
    else:
        result = 1
        for i in range(2, n + 1):
            result *= i
        return result"
            language="python"
            readonly={true}
            onChange={() => {}}
          />
          <Coding.AssertionCode>
            <AssertionCodeTab label="factorial(1)" success>
              <AssertionCodeTab.Code
                src="assert factorial(1) == 1"
                language="python"
                readonly={true}
                onChange={() => {}}
              ></AssertionCodeTab.Code>
              <AssertionCodeTab.Output objects={[]}></AssertionCodeTab.Output>
            </AssertionCodeTab>
            <AssertionCodeTab label="factorial(-1)" success={false}>
              <AssertionCodeTab.Code
                src="assert factorial(-1) == 1"
                language="python"
                readonly={true}
                onChange={() => {}}
              ></AssertionCodeTab.Code>
              <AssertionCodeTab.Output
                objects={[{ output: 'Assertion error', type: 'error' }]}
              ></AssertionCodeTab.Output>
            </AssertionCodeTab>
            <AssertionCodeTab label="factorial(3)" success>
              <AssertionCodeTab.Code
                src="assert factorial(3) == 6"
                language="python"
                readonly={true}
                onChange={() => {}}
              ></AssertionCodeTab.Code>
              <AssertionCodeTab.Output objects={[]}></AssertionCodeTab.Output>
            </AssertionCodeTab>
            <AssertionCodeTab label="factorial(4)" success>
              <AssertionCodeTab.Code
                src="assert factorial(4) == 24"
                language="python"
                readonly={true}
                onChange={() => {}}
              ></AssertionCodeTab.Code>
              <AssertionCodeTab.Output objects={[]}></AssertionCodeTab.Output>
            </AssertionCodeTab>
          </Coding.AssertionCode>
          <Coding.Toolbar>
            <ToolbarButton
              icon={checkIcon.svgstr}
              onClick={() => {}}
              label="Verify"
            ></ToolbarButton>
            <ToolbarButton
              icon={runAllIcon.svgstr}
              onClick={() => {}}
              label="Run all"
            ></ToolbarButton>
            <ToolbarButton
              icon={runIcon.svgstr}
              onClick={() => {}}
              label="Run"
            ></ToolbarButton>
            <ToolbarButton
              icon={deleteIcon.svgstr}
              onClick={() => {}}
              label="Delete"
            ></ToolbarButton>
          </Coding.Toolbar>
        </Coding>
        <p className="text-xs text-right mr-4">
          Note: These buttons do not work
        </p>
      </ContentBody>
    </Content>
  );
};
