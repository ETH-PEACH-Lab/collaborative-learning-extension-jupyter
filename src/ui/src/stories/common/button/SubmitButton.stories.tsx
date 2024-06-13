import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../StoryObj';
import { SubmitButton } from '../../../common/button/SubmitButton';
import { fn } from '@storybook/test';

type CodingComponentPropsAndCustomArgs = React.ComponentProps<
  typeof SubmitButton
>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'common/button/SubmitButton',
  component: SubmitButton
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    onSubmit: fn(),
    onUndo: fn(),
    finalized: false,
    submitted: false,
    showBadgeOnSubmitted: false,
    className: ''
  },
  render: args => {
    return <SubmitButton {...args} />;
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
  name: 'Submitted example',
  args: {
    ...Template.args,
    submitted: true
  },
  render: Template.render
};
export const Third: Story = {
  name: 'Submitted with badge example',
  args: {
    ...Template.args,
    submitted: true,
    showBadgeOnSubmitted: true
  },
  render: Template.render
};
export const Fourth: Story = {
  name: 'Finalized example',
  args: {
    ...Template.args,
    finalized: true
  },
  render: Template.render
};

export const Fifth: Story = {
  name: 'Finalized and submitted example',
  args: {
    ...Template.args,
    finalized: true,
    submitted: true,
    showBadgeOnSubmitted: true
  },
  render: Template.render
};
