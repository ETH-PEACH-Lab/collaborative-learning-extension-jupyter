import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../StoryObj';
import { MarkdownEditor } from '../../../common/markdown/MarkdownEditor';

type CodingComponentPropsAndCustomArgs = React.ComponentProps<
  typeof MarkdownEditor
>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'common/markdown/MarkdownEditor',
  component: MarkdownEditor
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    src: 'test'
  },
  render: args => {
    return <MarkdownEditor {...args} />;
  }
} satisfies Story;

export const Primary: Story = {
  name: 'Base example',
  args: {
    ...Template.args
  },
  render: Template.render
};
