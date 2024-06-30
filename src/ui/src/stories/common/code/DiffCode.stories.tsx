import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../StoryObj';
import { Code, DiffCode } from '../../../common/code';
import { Content, ContentBody } from '../../../common';

type ComponentPropsAndCustomArgs = React.ComponentProps<typeof DiffCode>;

const meta: Meta<ComponentPropsAndCustomArgs> = {
  title: 'common/code/DiffCode',
  component: DiffCode
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    original: 'x = 2\nprint(x)',
    modified: 'x = 3\nprint(x)',
    modifiedLabel: 'Modified',
    originalLabel: 'Original',
    language: 'python'
  },
  render: args => {
    return <DiffCode {...args} />;
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
  name: 'Alignment example',
  args: {
    ...Template.args
  },
  render: args => {
    return (
      <Content>
        ¨
        <ContentBody>
          <Code src="x = 2" language="python" readonly={true} />
          <DiffCode {...args} />
        </ContentBody>
      </Content>
    );
  }
};
