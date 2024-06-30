import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../StoryObj';
import { StudentSelection, StudentSelectionTab } from '../../../common';

type ComponentPropsAndCustomArgs = React.ComponentProps<
  typeof StudentSelection
> & { numberOfTabs: number };

const meta: Meta<ComponentPropsAndCustomArgs> = {
  title: 'common/student-selection/StudentSelectionTab',
  component: StudentSelection
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    numberOfTabs: 3
  },
  render: args => {
    const Tabs = Array.from(Array(args.numberOfTabs).keys()).map(n => {
      return (
        <StudentSelectionTab
          key={n}
          label={`Student ${n}`}
          submitted={n % 2 === 0}
        >
          Student Content {n}
        </StudentSelectionTab>
      );
    });
    return (
      <StudentSelection {...args} pageSize={8}>
        {Tabs}
      </StudentSelection>
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
