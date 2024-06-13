import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../StoryObj';
import { RightAlignedToolbar } from '../../../common/toolbar/RightAlignedToolbar';

type CodingComponentPropsAndCustomArgs = React.ComponentProps<
  typeof RightAlignedToolbar
>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'common/toolbar/RightAlignedToolbar',
  component: RightAlignedToolbar
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    children: 'children'
  },
  render: args => {
    return <RightAlignedToolbar {...args} />;
  }
} satisfies Story;
export const Primary: Story = {
  name: 'Base example',
  args: {
    ...Template.args
  },
  render: Template.render
};
