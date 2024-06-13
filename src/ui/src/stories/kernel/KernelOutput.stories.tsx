import { type Meta } from '@storybook/react';
import React from 'react';
import { KernelOutput } from '../../kernel';
import { DeepStoryObj } from '../StoryObj';
type CodingComponentPropsAndCustomArgs = React.ComponentProps<
  typeof KernelOutput
>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'kernel/KernelOutput',
  component: KernelOutput
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  render: args => {
    return <KernelOutput {...args} />;
  }
} satisfies Story;

export const Primary: Story = {
  name: 'H1 html kernel output',
  args: {
    object: {
      type: 'text/html',
      output: '<h1>Test</h1>'
    }
  },
  render: Template.render
};
export const Secondary: Story = {
  name: 'Plain kernel output',
  args: {
    object: {
      type: 'text/plain',
      output: '<h1>Test</h1>'
    }
  },
  render: Template.render
};
export const Third: Story = {
  name: 'Json kernel output',
  args: {
    object: {
      type: 'application/json',
      output: { test: { test: 'test' } }
    }
  },
  render: Template.render
};
export const Forth: Story = {
  name: 'Error kernel output',
  args: {
    object: {
      type: 'error',
      output: 'Error'
    }
  },
  render: Template.render
};

export const Fifth: Story = {
  name: 'PNG kernel output',
  args: {
    object: {
      type: 'image/png',
      output:
        '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'
    }
  },
  render: Template.render
};

export const Sixth: Story = {
  name: 'Stream kernel output',
  args: {
    object: {
      type: 'stream',
      output: 'Stream output'
    }
  },
  render: Template.render
};
