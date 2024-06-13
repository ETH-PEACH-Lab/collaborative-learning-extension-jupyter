import { type Meta } from '@storybook/react';
import React from 'react';
import { CodingIndicator } from '../../../common/grouping/CodingIndicator';
import { DeepStoryObj } from '../../StoryObj';
import { CodeComponent, adjustableHeightCodeOptions } from 'react-quiz-ui';
import { fn } from '@storybook/test';

type CodingIndicatorPropsAndCustomArgs = React.ComponentProps<
  typeof CodingIndicator
>;

const meta: Meta<CodingIndicatorPropsAndCustomArgs> = {
  title: 'common/grouping/CodingIndicator',
  component: CodingIndicator
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    label: 'Starting code'
  },
  render: args => {
    return (
      <CodingIndicator {...args}>
        <CodeComponent
          src="test"
          onCodeChange={fn()}
          language="python"
          config={{ options: adjustableHeightCodeOptions }}
        ></CodeComponent>
      </CodingIndicator>
    );
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
  name: 'Two code example',
  args: {
    ...Template.args,
    label: 'Starting Code'
  },
  render: args => {
    return (
      <>
        {Template.render(args)}
        {Template.render(args)}
      </>
    );
  }
};
export const Third: Story = {
  name: 'No label',
  args: {
    ...Template.args,
    label: undefined
  },
  render: args => {
    return (
      <>
        {Template.render(args)}
        {Template.render(args)}
      </>
    );
  }
};
