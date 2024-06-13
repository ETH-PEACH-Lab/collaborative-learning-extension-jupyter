import { UUID } from '@lumino/coreutils';
import { IField, FieldType } from '../../../types';
import Factory from '../Factory';

export default abstract class FieldFactory extends Factory<FieldType, IField> {
  protected createField(): IField {
    return {
      id: UUID.uuid4()
    };
  }
}
