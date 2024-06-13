import { type Meta } from '@storybook/react';
import React from 'react';

import { fn } from '@storybook/test';
import { DeepStoryObj } from '../../../../StoryObj';
import { MultipleChoiceInstructorConfigItem } from '../../../../../cell';

type MutlipleChoiceInstructorConfigItemAndCustomArgs = React.ComponentProps<
  typeof MultipleChoiceInstructorConfigItem
>;

const meta: Meta<MutlipleChoiceInstructorConfigItemAndCustomArgs> = {
  title:
    'cell/instructor/multiple-choice/config/MultipleChoiceInstructorConfigItem',
  component: MultipleChoiceInstructorConfigItem
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    label: 'Config',
    value: true,
    onChange: fn()
  },
  render: args => {
    return <MultipleChoiceInstructorConfigItem {...args} />;
  }
} satisfies Story;
export const Primary: Story = {
  name: 'True example',
  args: {
    ...Template.args
  },
  render: Template.render
};
export const Secondary: Story = {
  name: 'False example',
  args: {
    ...Template.args,
    value: false
  },
  render: Template.render
};
