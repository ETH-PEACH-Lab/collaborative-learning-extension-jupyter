import { type Meta } from '@storybook/react';
import React from 'react';

import { fn } from '@storybook/test';
import { CellDescription } from '../../cell';
import { DeepStoryObj } from '../StoryObj';
type CellDescriptionAndCustomArgs = React.ComponentProps<
  typeof CellDescription
>;

const meta: Meta<CellDescriptionAndCustomArgs> = {
  title: 'cell/CellDescription',
  component: CellDescription
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    onChange: fn(),
    src: 'Content of the cell description'
  },
  render: args => {
    return <CellDescription {...args} />;
  }
} satisfies Story;
export const Primary: Story = {
  name: 'Student view',
  args: {
    ...Template.args
  },
  render: Template.render
};
export const Secondary: Story = {
  name: 'Instructor view',
  args: {
    ...Template.args,
    isInstructor: true
  },
  render: Template.render
};
