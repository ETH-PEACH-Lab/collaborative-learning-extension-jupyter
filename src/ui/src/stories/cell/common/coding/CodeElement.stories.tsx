import { type Meta } from '@storybook/react';
import React from 'react';
import { fn } from '@storybook/test';
import { DeepStoryObj } from '../../../StoryObj';
import { CodeElement } from '../../../../cell';

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
    src: 'test',
    language: 'python',
    readonly: false,
    onChange: fn()
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
export const Secondary: Story = {
  name: 'Readonly example',
  args: {
    ...Template.args,
    readonly: true
  },
  render: Template.render
};
