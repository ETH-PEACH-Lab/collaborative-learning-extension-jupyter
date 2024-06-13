import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../../StoryObj';
import { fn } from '@storybook/test';
import { ToolbarToggle } from '../../../../common/content';

type CodingComponentPropsAndCustomArgs = React.ComponentProps<
  typeof ToolbarToggle
>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'common/content/toolbar/ToolbarToggle',
  component: ToolbarToggle
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    label: 'test',
    onChange: fn(),
    checked: false
  },
  render: args => {
    return <ToolbarToggle {...args}></ToolbarToggle>;
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
  name: 'Disabled example',
  args: {
    ...Template.args
  },
  render: Template.render
};
export const Third: Story = {
  name: 'Set to true example',
  args: {
    ...Template.args,
    checked: true
  },
  render: Template.render
};
