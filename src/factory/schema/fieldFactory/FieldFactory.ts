import { UUID } from '@lumino/coreutils';
import { IField, FieldType } from '../../../types/schemaTypes';
import Factory from '../Factory';

export default abstract class FieldFactory extends Factory<FieldType> {
  protected createField(): IField {
    return {
      id: UUID.uuid4(),
      src: ''
    };
  }
}
