import { type Meta } from '@storybook/react';
import React from 'react';
import { Content, Toolbar } from '../../../../common/content';
import { DeepStoryObj } from '../../../StoryObj';

type CodingComponentPropsAndCustomArgs = React.ComponentProps<typeof Toolbar>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'common/content/toolbar/Toolbar',
  component: Toolbar
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    children: 'children',
    showOnHover: false
  },
  render: args => {
    return (
      <Content>
        <Toolbar {...args} />
      </Content>
    );
  }
} satisfies Story;
export const Primary: Story = {
  name: 'Show on hover: false example',
  args: {
    ...Template.args
  },
  render: Template.render
};

export const Secondary: Story = {
  name: 'Show on hover: true example',
  args: {
    ...Template.args,
    showOnHover: true
  },
  render: Template.render
};
