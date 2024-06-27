import { type Meta } from '@storybook/react';
import React from 'react';
import { fn } from '@storybook/test';
import { DeepStoryObj } from '../../../StoryObj';
import { MultipleChoiceStudent } from '../../../../cell/student/multiple-choice/MultipleChoiceStudent';
import { IMultipleChoiceItem } from 'react-quiz-ui';
import { Content, ContentBody } from '../../../../common/content';

type MultipleChoiceStudentAndCustomArgs = React.ComponentProps<
  typeof MultipleChoiceStudent
> & { numberOfItems: number };

const meta: Meta<MultipleChoiceStudentAndCustomArgs> = {
  title: 'cell/student/multiple-choice/MultipleChoiceStudent',
  component: MultipleChoiceStudent
};

export default meta;

type Story = DeepStoryObj<typeof meta>;

const Template = {
  args: {
    answer: [],
    onAnswerChanges: fn(),
    setSubmit: fn(),
    numberOfItems: 3,
    solutionOptions: ['id0'],
    options: {
      multi: false,
      random: false,
      showSolution: false,
      submitted: false,
      distributionPerItem: [0, 0, 0]
    }
  },
  render: args => {
    const items = Array.from(Array(args.numberOfItems).keys()).map(index => {
      return {
        id: 'id' + index,
        src: 'content ' + index
      } satisfies IMultipleChoiceItem;
    });
    return <MultipleChoiceStudent {...args} items={items} />;
  }
} satisfies Story;

export const Primary: Story = {
  name: 'Submitted + selected example',
  args: {
    ...Template.args,
    answer: ['id1'],
    options: {
      submitted: true,
      distributionPerItem: [100, 0, 0]
    }
  },
  render: Template.render
};
export const Secondary: Story = {
  name: 'Submitted + selected example + show solution',
  args: {
    ...Template.args,
    answer: ['id1'],
    options: {
      showSolution: true,
      submitted: true,
      multi: true,
      distributionPerItem: [100, 0, 0]
    }
  },
  render: Template.render
};

export const Forth: Story = {
  name: 'Cell example',
  args: {
    ...Template.args,
    answer: ['id1'],
    options: {
      showSolution: true,
      submitted: true,
      distributionPerItem: [40, 30, 30]
    }
  },
  render: args => {
    return (
      <Content>
        <ContentBody>
          <h2>Multiple Choice Description </h2>
          <p>...</p>
          {Template.render(args)}
        </ContentBody>
      </Content>
    );
  }
};
