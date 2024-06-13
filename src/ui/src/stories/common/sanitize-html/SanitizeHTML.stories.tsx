import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../StoryObj';
import { SanitizeHTML } from '../../../common/sanitize-html/SanitizeHTML';

type CodingComponentPropsAndCustomArgs = React.ComponentProps<
  typeof SanitizeHTML
>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'common/sanitize-html/SanitizeHTML',
  component: SanitizeHTML
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    html: 'test'
  },
  render: args => {
    return <SanitizeHTML {...args} />;
  }
} satisfies Story;

export const Primary: Story = {
  name: 'Base example',
  args: {
    ...Template.args
  },
  render: Template.render
};
