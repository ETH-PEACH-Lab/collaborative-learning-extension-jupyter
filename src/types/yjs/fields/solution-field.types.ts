import { IField, Language } from '../field.types';

export type SolutionType =
  | 'code-solution'
  | 'text-solution'
  | 'multiple-choice-solution';

export interface IStudentSolution extends IField {
  grade: number;
  comment: string;
  src?: any;
  submitted: boolean;
}

export interface ICodeSolution extends IStudentSolution {
  src: string;
  type: 'code-solution';
  language: Language;
}
export interface ITextSolution extends IStudentSolution {
  src: string;
  type: 'text-solution';
}
export interface IMultipleChoiceSolution extends IStudentSolution {
  type: 'multiple-choice-solution';
  src: string[];
}
