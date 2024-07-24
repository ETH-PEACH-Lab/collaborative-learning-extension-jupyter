import { useRef, useState } from 'react';

export const useTriggerCompiling = (): [
  (r: string, c: () => void, t: number) => void,
  boolean
] => {
  const compiling = useRef<Promise<void> | null>(null);
  const reference = useRef<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  return [
    (
      referenceId: string,
      callback: () => void,
      timeoutBetweenCompilations = 1000
    ) => {
      if (reference.current !== referenceId) {
        reference.current = referenceId;
        compiling.current = null;
      }
      if (compiling.current !== null) {
        return;
      }
      setIsCompiling(true);
      compiling.current = new Promise(resolve => {
        setTimeout(() => {
          resolve(void 0);
        }, timeoutBetweenCompilations);
      }).then(() => {
        console.debug('Compiling code');
        callback();
        compiling.current = null;
        setIsCompiling(false);
      });
    },
    isCompiling
  ];
};
