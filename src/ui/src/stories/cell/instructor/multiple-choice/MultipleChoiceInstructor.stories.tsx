import { type Meta } from '@storybook/react';
import React from 'react';

import { fn } from '@storybook/test';
import { DeepStoryObj } from '../../../StoryObj';
import {
  MultipleChoiceInstructor,
  MultipleChoiceInstructorConfigContainer,
  MultipleChoiceInstructorConfigItem,
  MultipleChoiceInstructorItem
} from '../../../../cell';
import { Content, ContentBody } from '../../../../common/content';
type MutlipleChoiceInstructorConfigItemAndCustomArgs = React.ComponentProps<
  typeof MultipleChoiceInstructor
> & { numberOfItems: number };

const meta: Meta<MutlipleChoiceInstructorConfigItemAndCustomArgs> = {
  title: 'cell/instructor/multiple-choice/MultipleChoiceInstructor',
  component: MultipleChoiceInstructor
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    addMultipleChoiceOption: fn(),
    numberOfItems: 0
  },
  render: args => {
    const children = Array.from(Array(args.numberOfItems).keys()).map(index => (
      <MultipleChoiceInstructorItem
        content={'content ' + index}
        index={index}
        maxIndex={args.numberOfItems - 1}
        options={{ multi: true, randomOrder: true }}
        onItemContentChange={fn()}
        onSelectionChange={fn()}
        swapPosition={fn()}
        optionId={'id' + index}
        parentId="parentId"
        remove={fn()}
      ></MultipleChoiceInstructorItem>
    ));
    return (
      <MultipleChoiceInstructor {...args}>
        <MultipleChoiceInstructorConfigContainer label={'Config'}>
          <MultipleChoiceInstructorConfigItem
            label={'Random Order'}
            value={true}
            onChange={fn()}
          />
          <MultipleChoiceInstructorConfigItem
            label={'Config'}
            value={true}
            onChange={fn()}
          />
        </MultipleChoiceInstructorConfigContainer>
        {children}
      </MultipleChoiceInstructor>
    );
  }
} satisfies Story;
export const Primary: Story = {
  name: 'Config example',
  args: {
    ...Template.args
  },
  render: Template.render
};

export const Secondary: Story = {
  name: 'Config + one item example',
  args: {
    ...Template.args,
    numberOfItems: 1
  },
  render: Template.render
};
export const Third: Story = {
  name: 'Config + multiple items example',
  args: {
    ...Template.args,
    numberOfItems: 2
  },
  render: Template.render
};
export const Forth: Story = {
  name: 'Cell Example: Config + multiple items',
  args: {
    ...Template.args,
    numberOfItems: 2
  },
  render: args => {
    return (
      <Content>
        <ContentBody>{Template.render(args)}</ContentBody>
      </Content>
    );
  }
};
