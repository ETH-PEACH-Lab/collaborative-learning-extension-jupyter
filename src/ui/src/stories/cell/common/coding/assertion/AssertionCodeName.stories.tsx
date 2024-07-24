import { type Meta } from '@storybook/react';
import React from 'react';
import { fn } from '@storybook/test';
import { DeepStoryObj } from '../../../../StoryObj';
import { AssertionCodeName } from '../../../../../cell/common/coding/part/assertion/name/AssertionCodeName';

type AssertionCodeNameAndCustomArgs = React.ComponentProps<
  typeof AssertionCodeName
>;

const meta: Meta<AssertionCodeNameAndCustomArgs> = {
  title: 'cell/common/coding/assertion/AssertionCodeName',
  component: AssertionCodeName
};

export default meta;

type Story = DeepStoryObj<typeof meta>;

const Template = {
  args: {
    name: 'Assert 1 == 1',
    onNameChange: fn()
  },
  render: args => {
    return <AssertionCodeName {...args} />;
  }
} satisfies Story;

export const Primary: Story = {
  name: 'Base example',
  args: {
    ...Template.args
  },
  render: Template.render
};
