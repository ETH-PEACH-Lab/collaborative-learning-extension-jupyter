import {
  IKernelExecution,
  IKernelTestVerification
} from '../../../../../../types/kernelTypes';
import {
  ICodeField,
  ITestCodeField
} from '../../../../../../types/schemaTypes';

export default function useKernel() {
  const createKernelTestVerification = (
    id: string,
    cellId: string,
    ...fields: (ICodeField | ITestCodeField)[]
  ): IKernelTestVerification => {
    return {
      referenceId: id,
      src: fields.map(field => field.src).join('\r\n'),
      cellId: cellId
    };
  };
  const createKernelExecution = (
    id: string,
    ...fields: (ICodeField | ITestCodeField)[]
  ): IKernelExecution[] => {
    return [
      { referenceId: id, src: fields.map(field => field.src).join('\r\n') }
    ];
  };
  const createMultipleKernelExecution = (
    testfields: ITestCodeField[],
    ...additionalFields: ICodeField[]
  ): IKernelExecution[] => {
    return testfields.map(testField => {
      return {
        referenceId: testField.id,
        src:
          additionalFields.map(field => field.src).join('\r\n') +
          '\r\n' +
          testField.src
      };
    });
  };

  return {
    createKernelTestVerification,
    createKernelExecution,
    createMultipleKernelExecution
  };
}
