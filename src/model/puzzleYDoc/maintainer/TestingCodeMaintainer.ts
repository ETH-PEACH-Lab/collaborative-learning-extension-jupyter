import { User } from '@jupyterlab/services';
import * as Y from 'yjs';
import FieldFactoryService from '../../../services/FieldFactoryService';
import ArrayFieldMaintainer from './ArrayFieldMaintainer';
export default class TestingCodeMaintainer extends ArrayFieldMaintainer {
  constructor(transact: (fn: () => void) => void) {
    super('testingCode', transact);
  }
  setTestToVerified(yCell: Y.Map<any>, testCodeId: string) {
    const testingCodeAsYMap = this._getArrayFieldByIdAsYMap(testCodeId, yCell);
    testingCodeAsYMap.set('verified', true);
  }

  addTestCode(yCell: Y.Map<any>, identity: User.IIdentity) {
    const testCode = FieldFactoryService.instance.create('test-code');
    testCode.set('createdBy', identity.username);
    this.addField(yCell, testCode);
  }
}
