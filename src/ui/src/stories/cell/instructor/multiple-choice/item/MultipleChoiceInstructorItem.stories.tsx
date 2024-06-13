import { type Meta } from '@storybook/react';
import React from 'react';

import { fn } from '@storybook/test';
import { DeepStoryObj } from '../../../../StoryObj';
import { MultipleChoiceInstructorItem } from '../../../../../cell/instructor/multiple-choice/item/MultipleChoiceInstructorItem';
type MutlipleChoiceInstructorConfigItemAndCustomArgs = React.ComponentProps<
  typeof MultipleChoiceInstructorItem
>;

const meta: Meta<MutlipleChoiceInstructorConfigItemAndCustomArgs> = {
  title: 'cell/instructor/multiple-choice/item/MultipleChoiceInstructorItem',
  component: MultipleChoiceInstructorItem
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    optionId: 'optionId',
    content: 'content',
    index: 0,
    maxIndex: 0,
    options: {
      multi: true,
      randomOrder: false
    },
    selected: false,
    onItemContentChange: fn(),
    onSelectionChange: fn(),
    swapPosition: fn(),
    remove: fn()
  },
  render: args => {
    return <MultipleChoiceInstructorItem {...args} />;
  }
} satisfies Story;
export const Primary: Story = {
  name: 'Multi choice example',
  args: {
    ...Template.args
  },
  render: Template.render
};
export const Secondary: Story = {
  name: 'Single choice example',
  args: {
    ...Template.args,
    options: {
      multi: false,
      randomOrder: false
    }
  },
  render: Template.render
};

export const Third: Story = {
  name: 'Random ordered single choice example',
  args: {
    ...Template.args,
    options: {
      multi: false,
      randomOrder: true
    }
  },
  render: Template.render
};
