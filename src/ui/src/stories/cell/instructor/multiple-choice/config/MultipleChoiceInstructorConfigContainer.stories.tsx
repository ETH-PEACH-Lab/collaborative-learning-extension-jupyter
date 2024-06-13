import { type Meta } from '@storybook/react';
import React from 'react';

import { fn } from '@storybook/test';
import { DeepStoryObj } from '../../../../StoryObj';
import {
  MultipleChoiceInstructorConfigContainer,
  MultipleChoiceInstructorConfigItem
} from '../../../../../cell';
type MultipleChoiceInstructorConfigContainerAndCustomArgs =
  React.ComponentProps<typeof MultipleChoiceInstructorConfigContainer> & {
    numberOfChildren: number;
  };

const meta: Meta<MultipleChoiceInstructorConfigContainerAndCustomArgs> = {
  title:
    'cell/instructor/multiple-choice/config/MultipleChoiceInstructorConfigContainer',
  component: MultipleChoiceInstructorConfigContainer
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    label: 'Config',
    numberOfChildren: 1
  },
  render: args => {
    const children = Array.from(Array(args.numberOfChildren).keys()).map(
      index => (
        <MultipleChoiceInstructorConfigItem
          label={'Config ' + index}
          value={true}
          onChange={fn()}
        />
      )
    );
    return (
      <MultipleChoiceInstructorConfigContainer {...args}>
        {children}
      </MultipleChoiceInstructorConfigContainer>
    );
  }
} satisfies Story;
export const Primary: Story = {
  name: 'One Item example',
  args: {
    ...Template.args,
    numberOfChildren: 1
  },
  render: Template.render
};
export const Secondary: Story = {
  name: 'False example',
  args: {
    ...Template.args,
    numberOfChildren: 2
  },
  render: Template.render
};
