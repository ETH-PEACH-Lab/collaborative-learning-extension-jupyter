export type Tab = {
  id: string;
  name: string;
  index: number;
  targetIdentifier: string;
  studentOnly?: boolean;
  instructorOnly?: boolean;
};
