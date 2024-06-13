import { type Meta } from '@storybook/react';
import React from 'react';
import { fn } from '@storybook/test';
import { DeepStoryObj } from '../../../StoryObj';
import { TextResponseStudent } from '../../../../cell';
type TextResponseStudentAndCustomArgs = React.ComponentProps<
  typeof TextResponseStudent
>;

const meta: Meta<TextResponseStudentAndCustomArgs> = {
  title: 'cell/student/text-response/TextResponseStudent',
  component: TextResponseStudent
};

export default meta;

type Story = DeepStoryObj<typeof meta>;

const Template = {
  args: {
    answer: '',
    onAnswerChanges: fn(),
    setSubmit: fn(),
    options: {
      showSolution: false,
      submitted: false
    },
    solution: 'solution'
  },
  render: args => {
    return <TextResponseStudent {...args} />;
  }
} satisfies Story;

export const Primary: Story = {
  name: 'Empty example',
  args: {
    ...Template.args
  },
  render: Template.render
};
export const Secondary: Story = {
  name: 'Initial answer example',
  args: {
    ...Template.args,
    answer: 'initial answer'
  },
  render: Template.render
};
export const Third: Story = {
  name: 'Initial answer + submitted example',
  args: {
    ...Template.args,
    answer: 'initial answer',
    options: {
      submitted: true
    }
  },
  render: Template.render
};
export const Fourth: Story = {
  name: 'Initial answer + submitted + show solution example',
  args: {
    ...Template.args,
    answer: 'initial answer',
    options: {
      submitted: true,
      showSolution: true
    }
  },
  render: Template.render
};
