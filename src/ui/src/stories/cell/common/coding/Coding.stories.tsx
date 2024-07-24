import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../../StoryObj';
import { AssertionCode, AssertionCodeCollapse, Coding } from '../../../../cell';
import { fn } from '@storybook/test';
import { BaseButton, ToolbarButton } from '../../../../common';
import { submitIcon } from '../../../../icon';
import { AssertionCodeContent } from '../../../../cell/common/coding/part/assertion/content/AssertionCodeContent';
import { AssertionCodeName } from '../../../../cell/common/coding/part/assertion/name/AssertionCodeName';
import { runIcon } from '@jupyterlab/ui-components';

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
          <AssertionCode.Collapse tabIndex={0}>
            <AssertionCodeCollapse.Name
              name="testssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
              onNameChange={fn()}
              editing={false}
              success
            >
              <AssertionCodeName.Toolbar>
                <BaseButton
                  onClick={fn()}
                  icon={runIcon.svgstr}
                  label="Run"
                ></BaseButton>
              </AssertionCodeName.Toolbar>
            </AssertionCodeCollapse.Name>
            <AssertionCodeCollapse.Content>
              <AssertionCodeContent.Code
                src="assert 1 = 1"
                language="python"
                readonly={true}
                onChange={fn()}
              />
              <AssertionCodeContent.Output
                objects={[]}
              ></AssertionCodeContent.Output>
            </AssertionCodeCollapse.Content>
          </AssertionCode.Collapse>
          <AssertionCode.Collapse tabIndex={1}>
            <AssertionCodeCollapse.Name
              name="test"
              onNameChange={fn()}
              editing={false}
              success={false}
            >
              <AssertionCodeName.Toolbar>
                <BaseButton
                  onClick={fn()}
                  icon={runIcon.svgstr}
                  label="Run"
                ></BaseButton>
              </AssertionCodeName.Toolbar>
            </AssertionCodeCollapse.Name>
            <AssertionCodeCollapse.Content>
              <AssertionCodeContent.Code
                src="assert 1 = 1"
                language="python"
                readonly={true}
                onChange={fn()}
              />
              <AssertionCodeContent.Output
                objects={[]}
              ></AssertionCodeContent.Output>
            </AssertionCodeCollapse.Content>
          </AssertionCode.Collapse>
          <AssertionCode.Collapse tabIndex={2}>
            <AssertionCodeCollapse.Name
              name="test"
              onNameChange={fn()}
              editing={true}
            >
              <AssertionCodeName.Toolbar>
                <BaseButton
                  onClick={fn()}
                  icon={runIcon.svgstr}
                  label="Run"
                ></BaseButton>
              </AssertionCodeName.Toolbar>
            </AssertionCodeCollapse.Name>
            <AssertionCodeCollapse.Content>
              <AssertionCodeContent.Code
                src="assert 1 = 1"
                language="python"
                readonly={false}
                onChange={fn()}
              />
              <AssertionCodeContent.Output
                objects={[]}
              ></AssertionCodeContent.Output>
            </AssertionCodeCollapse.Content>
          </AssertionCode.Collapse>
        </Coding.AssertionCode>
        <Coding.Toolbar>
          <ToolbarButton
            icon={submitIcon.svgstr}
            onClick={fn()}
            label="Submit"
          ></ToolbarButton>
        </Coding.Toolbar>
      </Coding>
    );
  }
};
