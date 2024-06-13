import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../StoryObj';
import { Markdown } from '../../../common/markdown/Markdown';

type CodingComponentPropsAndCustomArgs = React.ComponentProps<typeof Markdown>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'common/markdown/Markdown',
  component: Markdown
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    src: 'test'
  },
  render: args => {
    return <Markdown {...args} />;
  }
} satisfies Story;

export const Primary: Story = {
  name: 'Base example',
  args: {
    ...Template.args
  },
  render: Template.render
};
