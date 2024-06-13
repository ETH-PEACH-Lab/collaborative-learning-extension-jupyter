import { type Meta } from '@storybook/react';
import React from 'react';
import { fn } from '@storybook/test';
import { DeepStoryObj } from '../../StoryObj';
import { CodeElement } from '../../../cell';

type CodeElementAndCustomArgs = React.ComponentProps<typeof CodeElement>;

const meta: Meta<CodeElementAndCustomArgs> = {
  title: 'cell/common/coding/CodeElement',
  component: CodeElement
};

export default meta;

type Story = DeepStoryObj<typeof meta>;

const Template = {
  args: {
    label: 'Starting code',
    code: 'test',
    language: 'python',
    onCodeChange: fn()
  },
  render: args => {
    return <CodeElement {...args} />;
  }
} satisfies Story;

export const Primary: Story = {
  name: 'Base example',
  args: {
    ...Template.args
  },
  render: Template.render
};
