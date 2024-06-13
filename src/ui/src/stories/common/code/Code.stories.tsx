import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../StoryObj';
import { Code } from '../../../common/code/Code';
import { fn } from '@storybook/test';

type CodingComponentPropsAndCustomArgs = React.ComponentProps<typeof Code>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'common/code/Code',
  component: Code
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    src: 'x = 2\nprint(x)',
    language: 'python',
    onChange: fn(),
    readonly: false
  },
  render: args => {
    return <Code {...args} />;
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
