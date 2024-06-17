import { type Meta } from '@storybook/react';
import React from 'react';
import { addIcon } from '@jupyterlab/ui-components';
import { ToolbarButton } from '../../../../common/content';
import { DeepStoryObj } from '../../../StoryObj';

type CodingComponentPropsAndCustomArgs = React.ComponentProps<
  typeof ToolbarButton
>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'common/content/toolbar/ToolbarButton',
  component: ToolbarButton
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    icon: addIcon.svgstr
  },
  render: args => {
    return <ToolbarButton {...args}></ToolbarButton>;
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
    ...Template.args,
    disabled: true
  },
  render: Template.render
};
export const Forth: Story = {
  name: 'Label example',
  args: {
    ...Template.args,
    label: 'Add'
  },
  render: Template.render
};
export const Third: Story = {
  name: 'Hidden example',
  args: {
    ...Template.args,
    hide: true
  },
  render: Template.render
};
