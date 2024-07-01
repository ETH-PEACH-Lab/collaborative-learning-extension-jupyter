import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../StoryObj';
import { Feedback } from '../../../common';

type ComponentPropsAndCustomArgs = React.ComponentProps<typeof Feedback>;

const meta: Meta<ComponentPropsAndCustomArgs> = {
  title: 'common/feedback/Feedback',
  component: Feedback
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    feedbackAsMarkdown: '# Feedback\n\nThis is a feedback message.'
  },
  render: args => {
    return <Feedback {...args} />;
  }
} satisfies Story;
export const Primary: Story = {
  name: 'Base example',
  args: {
    ...Template.args
  },
  render: Template.render
};
