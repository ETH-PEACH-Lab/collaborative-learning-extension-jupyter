import { useEffect } from 'react';
import { defineDiffTheme } from '../ui';
import { useMonaco } from '@monaco-editor/react';
export const monacoLoader = () => {
  const monaco = useMonaco();
  console.log('monacoLoader');
  useEffect(() => {
    if (!monaco) {
      return;
    }
    defineDiffTheme(monaco);
  }, [monaco]);
};
