import React, { useState } from 'react';
import {
  AssertionCodeTab,
  CellDescription,
  Coding,
  Content,
  ContentBody,
  Toolbar,
  ToolbarToggle
} from '../../../../../../src/ui';

export const CodingExample: React.FC = () => {
  const [onlyFaulty, setOnlyFaulty] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [testingMode, setTestingMode] = useState('tests');

  return (
    <Content>
      <Toolbar showOnHover>
        <ToolbarToggle
          checked={showSolution}
          onChange={setShowSolution}
          label="Show Solution"
        ></ToolbarToggle>
      </Toolbar>
      <ContentBody>
        <div className="pt-4 pb-4">
          <CellDescription
            isInstructor={false}
            src="Provide code to calculate factorial of n, where is n a natural number"
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
          {showSolution ? (
            <Coding.DiffCode
              language="python"
              modified="# Your code here
    if n == 0 or n == 1:
        return 1
    else:
        result = 1
        for i in range(2, n + 1):
            result *= i
        return result"
              modifiedLabel="Your Code"
              original="# Your code here
    if n <= 0 or n == 1:
        return 1
    else:
        result = 1
        for i in range(2, n + 1):
            result *= i
        return result"
              originalLabel="Solution"
            ></Coding.DiffCode>
          ) : (
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
          )}
          {(testingMode === 'tests' || testingMode === 'one-test-required') && (
            <Coding.AssertionCode
              onlyFaulty={onlyFaulty}
              setOnlyFaulty={setOnlyFaulty}
            >
              <AssertionCodeTab label="factorial(1)" success hide={onlyFaulty}>
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
              <AssertionCodeTab label="factorial(3)" success hide={onlyFaulty}>
                <AssertionCodeTab.Code
                  src="assert factorial(3) == 6"
                  language="python"
                  readonly={true}
                  onChange={() => {}}
                ></AssertionCodeTab.Code>
                <AssertionCodeTab.Output objects={[]}></AssertionCodeTab.Output>
              </AssertionCodeTab>
              <AssertionCodeTab label="factorial(4)" success hide={onlyFaulty}>
                <AssertionCodeTab.Code
                  src="assert factorial(4) == 24"
                  language="python"
                  readonly={true}
                  onChange={() => {}}
                ></AssertionCodeTab.Code>
                <AssertionCodeTab.Output objects={[]}></AssertionCodeTab.Output>
              </AssertionCodeTab>
            </Coding.AssertionCode>
          )}
          <Coding.Toolbar>
            <select
              defaultValue={testingMode}
              className="select text-left select-bordered w-full"
              onChange={event => {
                setTestingMode(event.target.value);
              }}
            >
              <option value="tests" disabled={testingMode === 'tests'}>
                Tests are active and no tests are required
              </option>
              <option
                value="one-test-required"
                disabled={testingMode === 'one-test-required'}
              >
                Tests are active and one test per student is required
              </option>
              <option value="no-tests" disabled={testingMode === 'no-tests'}>
                Tests are deactivated
              </option>
            </select>
          </Coding.Toolbar>
        </Coding>
      </ContentBody>
    </Content>
  );
};
