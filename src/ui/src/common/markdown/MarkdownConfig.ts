import { IMarkdownConfig } from 'react-quiz-ui';
// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
// @ts-ignore
import rehypeMathjax from 'rehype-mathjax';
import remarkMath from 'remark-math';

export const MarkdownConfig: IMarkdownConfig = {
  rehypePlugins: [rehypeMathjax],
  remarkPlugins: [remarkMath]
};
