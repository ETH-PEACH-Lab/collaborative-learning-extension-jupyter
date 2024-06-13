import { type Meta } from '@storybook/react';
import React from 'react';
import { fn } from '@storybook/test';
import { DeepStoryObj } from '../../../StoryObj';
import { TextResponseInstructor } from '../../../../cell';

type TextResponseInstructorAndCustomArgs = React.ComponentProps<
  typeof TextResponseInstructor
>;

const meta: Meta<TextResponseInstructorAndCustomArgs> = {
  title: 'cell/instructor/text-response/TextResponseInstructor',
  component: TextResponseInstructor
};

export default meta;

type Story = DeepStoryObj<typeof meta>;

const Template = {
  args: {
    src: 'test',
    onChange: fn()
  },
  render: args => {
    return <TextResponseInstructor {...args} />;
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
  name: 'Empty source example',
  args: {
    ...Template.args,
    src: ''
  },
  render: Template.render
};
