import React from 'react';
import { BadgeLink } from './BadgeLink';
import { GitHubIcon } from './GitHubIcon';
import { PDFIcon } from './PDFIcon';

export type ProjectPageHeaderProps = {};

export const ProjectPageHeader: React.FC<ProjectPageHeaderProps> = () => {
  return (
    <header className="text-center p-6">
      <h1>A Collaborative Learning Extension for Jupyter Notebook</h1>
      <h4>
        Author:{' '}
        <a
          target="_blank"
          className="hover:underline text-blue-400"
          href="https://www.linkedin.com/in/pascal-linder-student/"
        >
          Pascal Linder
        </a>
      </h4>
      <h4>
        Supervised by:{' '}
        <a
          target="_blank"
          className="hover:underline text-blue-400"
          href="https://www.aprilwang.me/"
        >
          April Wang
        </a>
        ,{' '}
        <a
          target="_blank"
          className="hover:underline text-blue-400"
          href="https://people.inf.ethz.ch/dkomm/"
        >
          Dennis Komm
        </a>
      </h4>
      <h4>ETH Zurich</h4>
      <h4>2024</h4>
      <div className="flex justify-center gap-4 mt-4">
        <BadgeLink href="" label="Thesis">
          <PDFIcon />
        </BadgeLink>
        <BadgeLink
          href="https://github.com/ETH-PEACH-Lab/collaborative-learning-extension-jupyter"
          label="Extension"
        >
          <GitHubIcon />
        </BadgeLink>
        <BadgeLink
          href="https://github.com/ETH-PEACH-Lab/react-quiz-ui"
          label="Quiz UI"
        >
          <GitHubIcon />
        </BadgeLink>
        <BadgeLink
          href="https://github.com/ETH-PEACH-Lab/yjs-normalized"
          label="Normalized Yjs"
        >
          <GitHubIcon />
        </BadgeLink>
      </div>
    </header>
  );
};
