import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../StoryObj';
import { SubmissionCounter } from '../../../cell';

type CodeElementAndCustomArgs = React.ComponentProps<typeof SubmissionCounter>;

const meta: Meta<CodeElementAndCustomArgs> = {
  title: 'cell/common/SubmissionCounter',
  component: SubmissionCounter
};

export default meta;

type Story = DeepStoryObj<typeof meta>;

const Template = {
  args: {
    counter: 0,
    total: 10
  },
  render: args => {
    return <SubmissionCounter {...args} />;
  }
} satisfies Story;

export const Primary: Story = {
  name: 'Base example',
  args: {
    ...Template.args
  },
  render: Template.render
};
