import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../StoryObj';
import { fn } from '@storybook/test';
import { BaseButton } from '../../../common';
import { addIcon } from '@jupyterlab/ui-components';

type CodingComponentPropsAndCustomArgs = React.ComponentProps<
  typeof BaseButton
>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'common/button/BaseButton',
  component: BaseButton
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    onClick: fn()
  },
  render: args => {
    return <BaseButton {...args} />;
  }
} satisfies Story;

export const Primary: Story = {
  name: 'Base example',
  args: {
    ...Template.args,
    label: 'Submit'
  },
  render: Template.render
};

export const Secondary: Story = {
  name: 'Icon example',
  args: {
    ...Template.args,
    icon: addIcon.svgstr
  },
  render: Template.render
};
export const Third: Story = {
  name: 'Label + Icon example',
  args: {
    ...Template.args,
    label: 'Add',
    icon: addIcon.svgstr
  },
  render: Template.render
};
export const Forth: Story = {
  name: 'Disabled Label + Icon example',
  args: {
    ...Template.args,
    label: 'Add',
    icon: addIcon.svgstr,
    disabled: true
  },
  render: Template.render
};
