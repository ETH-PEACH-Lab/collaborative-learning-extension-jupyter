import { type Meta } from '@storybook/react';
import React from 'react';
import { Indicator } from '../../../common/grouping/Indicator';
import { DeepStoryObj } from '../../StoryObj';

type CodingComponentPropsAndCustomArgs = React.ComponentProps<typeof Indicator>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'common/grouping/Indicator',
  component: Indicator
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    label: 'label',
    children: 'children'
  },
  render: args => {
    return <Indicator {...args} />;
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
  name: 'No label example',
  args: {
    ...Template.args,
    label: undefined
  },
  render: Template.render
};
