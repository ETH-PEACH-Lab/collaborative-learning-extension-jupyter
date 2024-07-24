import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  RootState,
  selectCell,
  selectNumberOfSuccessfulTests,
  selectStudentSolutionField,
  selectUnverifiedTestFieldForUserExists,
  selectVerifiedTestFieldsIds,
  store
} from '../../../../../../state';
import { ICodeCell } from '../../../../../../types';
import { AssertionCode, BaseButton, Indicator } from '../../../../../../ui';
import { CodeCellAssertionCollapse } from './assertion/CodeCellAssertionCollapse';
import {
  DocModelContext,
  IDocModelContext,
  IKernelContext,
  KernelContext
} from '../../../../../context';
import { addIcon } from '@jupyterlab/ui-components';
import { CodeCellAssertionTopToolbar } from './assertion/CodeCellAssertionTopToolbar';

const calculateTotalPages = (totalCount: number, pageSize: number) =>
  Math.ceil(totalCount / pageSize);

type CodeCellAssertionCodeProps = {
  cellId: string;
  instructorCodeId: string;
  isInstructor: boolean;
};
export const CodeCellAssertionCode: React.FC<CodeCellAssertionCodeProps> = ({
  cellId,
  instructorCodeId,
  isInstructor
}: CodeCellAssertionCodeProps) => {
  const [page, setPage] = React.useState(0);
  const pageSize = 5;

  const { addTestCodeField } = useContext(DocModelContext) as IDocModelContext;
  const { executeTest } = useContext(KernelContext) as IKernelContext;
  const [onlyFaulty, setOnlyFaulty] = useState(false);
  const username = useSelector(
    (state: RootState) => state.user.identity?.username
  ) as string;
  const assertionCodesIds = useSelector((state: RootState) =>
    selectVerifiedTestFieldsIds(state, cellId, username)
  );
  const metadata = useSelector(
    (state: RootState) => (selectCell(state, cellId) as ICodeCell).metadata
  );
  const studentCodeFieldId = useSelector(
    (state: RootState) =>
      selectStudentSolutionField(state, cellId, username)?.id
  ) as string;

  const unverifiedTestFieldExists = useSelector((state: RootState) =>
    selectUnverifiedTestFieldForUserExists(state, cellId, username)
  );
  const solutionCodeFieldId = useSelector(
    (state: RootState) =>
      (selectCell(state, cellId) as ICodeCell).solutionCodeId
  ) as string;

  const passedTestCases = useSelector((state: RootState) =>
    selectNumberOfSuccessfulTests(state, cellId)
  );

  const filteredAssertionCodes = useMemo(() => {
    return assertionCodesIds.filter(
      assertionCodeId =>
        !(
          store.getState().kernelTestResult.byId[assertionCodeId]?.result &&
          onlyFaulty
        )
    );
  }, [assertionCodesIds, onlyFaulty]);

  const totalPages = useMemo(
    () => calculateTotalPages(filteredAssertionCodes.length, pageSize),
    [filteredAssertionCodes.length, pageSize]
  );
  useEffect(() => {
    if (page >= totalPages && totalPages !== 0) {
      setPage(totalPages - 1);
    }
  }, [totalPages]);
  const AssertionCodeTabs = filteredAssertionCodes.map(
    (assertionCodeId, index) => (
      <CodeCellAssertionCollapse
        key={assertionCodeId}
        tabIndex={page * pageSize + index}
        assertionCodeId={assertionCodeId}
        cellId={cellId}
        studentCodeId={studentCodeFieldId}
        solutionCodeId={solutionCodeFieldId}
        instructorSelectedCodeId={instructorCodeId}
        isInstructor={isInstructor}
      />
    )
  );
  const AssertionCodeTabsSlice = AssertionCodeTabs.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  return metadata.testingMode === 'no-tests' ? (
    <></>
  ) : (
    <>
      <Indicator
        label={isInstructor ? 'AssertionCode' : undefined}
        className="mt-6"
      >
        <CodeCellAssertionTopToolbar
          hideRunAll={assertionCodesIds.length < 1}
          onRunAll={() =>
            assertionCodesIds.forEach(assertionCodeId => {
              executeTest({
                cellId,
                assertionCodeId,
                codeBodyId: isInstructor ? instructorCodeId : studentCodeFieldId
              });
            })
          }
          onlyFaulty={onlyFaulty}
          page={page}
          setOnlyFaulty={setOnlyFaulty}
          setPage={setPage}
          totalPages={totalPages}
        />
        <AssertionCode>{AssertionCodeTabsSlice}</AssertionCode>
        <div className="flex justify-end">
          Passed Test Cases {passedTestCases}/{assertionCodesIds.length}
        </div>
        <div className="flex justify-around">
          <BaseButton
            onClick={() => {
              addTestCodeField(cellId);
              setPage(0);
            }}
            label="Add Test Case"
            icon={addIcon.svgstr}
            className="mb-4 mt-2"
            disabled={unverifiedTestFieldExists}
          ></BaseButton>
        </div>
      </Indicator>
    </>
  );
};
