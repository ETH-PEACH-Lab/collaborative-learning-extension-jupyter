import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../../StoryObj';
import { AssertionCodeTab, Coding } from '../../../../cell';
import { fn } from '@storybook/test';
import { ToolbarButton } from '../../../../common';
import { checkIcon, deleteIcon, runIcon } from '@jupyterlab/ui-components';
import { runAllIcon } from '../../../../icon';

type AssertionCodeNameAndCustomArgs = React.ComponentProps<typeof Coding>;

const meta: Meta<AssertionCodeNameAndCustomArgs> = {
  title: 'cell/common/coding/Coding',
  component: Coding
};

export default meta;

type Story = DeepStoryObj<typeof meta>;

const Template = {
  args: {
    children: 'Test'
  },
  render: args => {
    return <Coding {...args} />;
  }
} satisfies Story;

export const Primary: Story = {
  name: 'Base example',
  args: {
    ...Template.args
  },
  render: args => {
    return (
      <Coding {...args}>
        <Coding.StartingCode
          src="test"
          language="python"
          readonly={true}
          onChange={fn()}
        />
        <Coding.StudentCode
          src="test"
          language="python"
          readonly={false}
          onChange={fn()}
        />
        <Coding.AssertionCode>
          <AssertionCodeTab label="test" success>
            <AssertionCodeTab.CodeName
              name="test"
              onNameChange={fn()}
            ></AssertionCodeTab.CodeName>
            <AssertionCodeTab.Code
              src="assert 2 == 2"
              language="python"
              readonly={true}
              onChange={fn()}
            ></AssertionCodeTab.Code>
            <AssertionCodeTab.Output objects={[]}></AssertionCodeTab.Output>
          </AssertionCodeTab>
          <AssertionCodeTab label="test2" success={false}>
            <AssertionCodeTab.CodeName
              name="test2"
              onNameChange={fn()}
            ></AssertionCodeTab.CodeName>
            <AssertionCodeTab.Code
              src="assert 1 = 1"
              language="python"
              readonly={true}
              onChange={fn()}
            ></AssertionCodeTab.Code>
            <AssertionCodeTab.Output
              objects={[{ output: 'Syntax Error', type: 'error' }]}
            ></AssertionCodeTab.Output>
          </AssertionCodeTab>
          <AssertionCodeTab label="test3" success>
            <AssertionCodeTab.CodeName
              name="test2"
              onNameChange={fn()}
            ></AssertionCodeTab.CodeName>
            <AssertionCodeTab.Code
              src="assert 1 == 1"
              language="python"
              readonly={true}
              onChange={fn()}
            ></AssertionCodeTab.Code>
            <AssertionCodeTab.Output
              objects={[{ output: 'Syntax Error', type: 'error' }]}
            ></AssertionCodeTab.Output>
          </AssertionCodeTab>
        </Coding.AssertionCode>
        <Coding.Toolbar>
          <ToolbarButton
            icon={checkIcon.svgstr}
            onClick={fn()}
            label="Verify"
          ></ToolbarButton>
          <ToolbarButton
            icon={runAllIcon.svgstr}
            onClick={fn()}
            label="Run all"
          ></ToolbarButton>
          <ToolbarButton
            icon={runIcon.svgstr}
            onClick={fn()}
            label="Run"
          ></ToolbarButton>
          <ToolbarButton
            icon={deleteIcon.svgstr}
            onClick={fn()}
            label="Delete"
          ></ToolbarButton>
        </Coding.Toolbar>
      </Coding>
    );
  }
};
