import { UUID } from '@lumino/coreutils';
import { IField, FieldType } from '../../../types';
import Factory from '../Factory';

export default abstract class FieldFactory extends Factory<FieldType> {
  protected createField(): IField {
    return {
      id: UUID.uuid4()
    };
  }
  public create(defaultSrc?: string): IField {
    return this.createSpecific(defaultSrc);
  }
  protected abstract createSpecific(defaultSrc?: string): IField;
}
