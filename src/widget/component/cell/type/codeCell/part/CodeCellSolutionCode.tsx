import { ICodeCell, ICodeField } from '../../../../../../types';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectCell } from '../../../../../../state/slice/yjs/cellsSlice';
import { RootState } from '../../../../../../state/store';
import { selectField } from '../../../../../../state/slice/yjs/fieldSlice';
import {
  DocModelContext,
  IDocModelContext
} from '../../../../../context/docModelContext';
import {
  Coding,
  CompilingKernelOutputContainer,
  StudentSelection
} from '../../../../../../ui';
import { CodeCellSolutionStudentTab } from './CodeCellSolutionStudentTab';
import { IKernelContext, KernelContext } from '../../../../../context';
import { selectKernelExecutionResult } from '../../../../../../state';
import { useTriggerCompiling } from '../hooks/useTriggerCompiling';
type CodeCellSolutionCodeProps = {
  cellId: string;
  isInstructor: boolean;
  onCodeTabChange: (codeId: string) => void;
};
export function CodeCellSolutionCode({
  cellId,
  isInstructor,
  onCodeTabChange
}: CodeCellSolutionCodeProps) {
  const { changeField } = useContext(DocModelContext) as IDocModelContext;
  const { executeCode } = useContext(KernelContext) as IKernelContext;
  const [triggerCompiling, isCompiling] = useTriggerCompiling();

  const studentSolutionIds = useSelector(
    (state: RootState) => selectCell(state, cellId).studentSolutionIds
  );
  const solutionCode = useSelector((state: RootState) =>
    selectField(state, (selectCell(state, cellId) as ICodeCell).solutionCodeId)
  ) as ICodeField;
  const kernelOutputs = useSelector((state: RootState) =>
    selectKernelExecutionResult(state, solutionCode.id)
  );

  if (solutionCode === undefined || !isInstructor) {
    return <></>;
  }
  const StudentCodeTabs = [];
  const trigger = (codeBodyId: string) =>
    triggerCompiling(
      codeBodyId,
      () => executeCode({ codeBodyId: codeBodyId, cellId: cellId }),
      1000
    );
  StudentCodeTabs.push(
    <StudentSelection.HomeTab
      label="Solution"
      onActiveTab={() => {
        onCodeTabChange(solutionCode.id);
        trigger(solutionCode.id);
      }}
    >
      <Coding.SolutionCode
        className="relative"
        language={solutionCode.language}
        src={solutionCode.src}
        onChange={value => {
          changeField({ ...solutionCode, src: value });
          trigger(solutionCode.id);
        }}
        readonly={false}
      >
        <CompilingKernelOutputContainer
          isCompiling={isCompiling}
          objects={kernelOutputs?.outputs ?? []}
          className="animate-fadein mt-2"
          classNameCompilingHint="absolute top-0 right-0 mr-4"
        ></CompilingKernelOutputContainer>
      </Coding.SolutionCode>
    </StudentSelection.HomeTab>
  );
  StudentCodeTabs.push(
    ...studentSolutionIds.map(id => {
      return (
        <CodeCellSolutionStudentTab
          studentSolutionId={id}
          cellId={cellId}
          onActiveTab={() => {
            onCodeTabChange(id);
            trigger(id);
          }}
          isCompiling={isCompiling}
        />
      );
    })
  );
  return (
    <div className="mt-4">
      <StudentSelection>{StudentCodeTabs}</StudentSelection>
    </div>
  );
}
