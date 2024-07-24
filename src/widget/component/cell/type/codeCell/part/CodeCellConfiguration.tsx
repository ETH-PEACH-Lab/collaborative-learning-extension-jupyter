import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState, selectCell } from '../../../../../../state';
import { Indicator } from '../../../../../../ui';
import { ICodeCell, TestingMode } from '../../../../../../types';
import { DocModelContext, IDocModelContext } from '../../../../../context';
type CodeCellConfigurationProps = {
  cellId: string;
};
export const CodeCellConfiguration: React.FC<CodeCellConfigurationProps> = ({
  cellId
}: CodeCellConfigurationProps) => {
  const codeCell = useSelector(
    (state: RootState) => selectCell(state, cellId) as ICodeCell
  );
  const { changeCell } = useContext(DocModelContext) as IDocModelContext;
  return (
    <Indicator label="Configuration">
      <select
        defaultValue={codeCell.metadata.testingMode}
        className="select text-left select-bordered w-full"
        onChange={event => {
          changeCell({
            ...codeCell,
            metadata: {
              ...codeCell.metadata,
              testingMode: event.target.value as TestingMode
            }
          });
        }}
      >
        <option
          value="tests"
          disabled={codeCell.metadata.testingMode === 'tests'}
        >
          Tests are active and no tests are required
        </option>
        <option
          value="one-test-required"
          disabled={codeCell.metadata.testingMode === 'one-test-required'}
        >
          Each student must verify one test before coding is allowed.
        </option>
        <option
          value="no-tests"
          disabled={codeCell.metadata.testingMode === 'no-tests'}
        >
          Tests are deactivated
        </option>
      </select>
    </Indicator>
  );
};
