import { type Meta } from '@storybook/react';
import React from 'react';
import { KernelOutputContainer } from '../../kernel';
import { DeepStoryObj } from '../StoryObj';
type CodingComponentPropsAndCustomArgs = React.ComponentProps<
  typeof KernelOutputContainer
>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'kernel/KernelOutputContainer',
  component: KernelOutputContainer
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  render: args => {
    return <KernelOutputContainer {...args} />;
  }
} satisfies Story;

export const Primary: Story = {
  name: 'One output',
  args: {
    objects: [
      {
        type: 'text/html',
        output: '<h1>Test</h1>'
      }
    ]
  },
  render: Template.render
};
export const Secondary: Story = {
  name: 'Multiple outputs',
  args: {
    objects: [
      {
        type: 'application/json',
        output: { test: { test: 'test' } }
      },
      {
        type: 'error',
        output: 'Error'
      }
    ]
  },
  render: Template.render
};
