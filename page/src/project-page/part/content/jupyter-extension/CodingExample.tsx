import React, { useState } from 'react';
import {
  AssertionCodeCollapse,
  AssertionCodeName,
  CellDescription,
  Coding,
  Content,
  ContentBody,
  Toolbar,
  ToolbarToggle
} from '../../../../../../src/ui';
import { AssertionCodeContent } from '../../../../../../src/ui/src/cell/common/coding/part/assertion/content/AssertionCodeContent';
import { CodingAssertionCodeNameToolbar } from './CodingAssertionCodeNameToolbar';
import { CodingAssertionTopToolbar } from './CodingAssertionTopToolbar';

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
            src="Provide code to calculate factorial of n, where n is a non-negative integer."
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
    if n == 1:
        return 1
    else:
        result = 1
        for i in range(2, n + 1):
            result *= i
        return result"
              modifiedLabel="Your Code"
              original="# Your code here
    if n == 0 or n == 1:
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
    if n == 1:
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
            <Coding.AssertionCode>
              <CodingAssertionTopToolbar
                onlyFaulty={onlyFaulty}
                setOnlyFaulty={setOnlyFaulty}
              ></CodingAssertionTopToolbar>
              <AssertionCodeCollapse tabIndex={0}>
                <AssertionCodeCollapse.Name
                  name="Test 3"
                  onNameChange={() => {}}
                  editing={true}
                  success={undefined}
                >
                  <AssertionCodeName.Toolbar>
                    <CodingAssertionCodeNameToolbar></CodingAssertionCodeNameToolbar>
                  </AssertionCodeName.Toolbar>
                </AssertionCodeCollapse.Name>
                <AssertionCodeCollapse.Content>
                  <AssertionCodeContent.Code
                    src="assert factorial(2) == 2"
                    language="python"
                    readonly={true}
                    onChange={() => {}}
                  ></AssertionCodeContent.Code>
                  <AssertionCodeContent.Output
                    objects={[]}
                  ></AssertionCodeContent.Output>
                </AssertionCodeCollapse.Content>
              </AssertionCodeCollapse>
              {!onlyFaulty ? (
                <AssertionCodeCollapse tabIndex={1}>
                  <AssertionCodeCollapse.Name
                    name="Test 1"
                    onNameChange={() => {}}
                    editing={false}
                    success={true}
                  >
                    <AssertionCodeName.Toolbar>
                      <CodingAssertionCodeNameToolbar
                        verified
                      ></CodingAssertionCodeNameToolbar>
                    </AssertionCodeName.Toolbar>
                  </AssertionCodeCollapse.Name>
                  <AssertionCodeCollapse.Content>
                    <AssertionCodeContent.Code
                      src="assert factorial(1) == 1"
                      language="python"
                      readonly={true}
                      onChange={() => {}}
                    ></AssertionCodeContent.Code>
                    <AssertionCodeContent.Output
                      objects={[]}
                    ></AssertionCodeContent.Output>
                  </AssertionCodeCollapse.Content>
                </AssertionCodeCollapse>
              ) : (
                <></>
              )}
              <AssertionCodeCollapse tabIndex={2}>
                <AssertionCodeCollapse.Name
                  name="Test 2"
                  onNameChange={() => {}}
                  editing={false}
                  success={false}
                >
                  <AssertionCodeName.Toolbar>
                    <CodingAssertionCodeNameToolbar
                      verified
                    ></CodingAssertionCodeNameToolbar>
                  </AssertionCodeName.Toolbar>
                </AssertionCodeCollapse.Name>
                <AssertionCodeCollapse.Content>
                  <AssertionCodeContent.Code
                    src="assert factorial(0) == 0"
                    language="python"
                    readonly={true}
                    onChange={() => {}}
                  ></AssertionCodeContent.Code>
                  <AssertionCodeContent.Output
                    objects={[{ output: 'Assertion Error', type: 'error' }]}
                  ></AssertionCodeContent.Output>
                </AssertionCodeCollapse.Content>
              </AssertionCodeCollapse>
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
                Each student must verify one test before coding is allowed.
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
