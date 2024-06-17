import { type Meta } from '@storybook/react';
import React from 'react';
import { DeepStoryObj } from '../../StoryObj';
import { Tabs } from '../../../common/tabs/Tabs';
import { Tab } from '../../../common/tabs/Tab';
import { fn } from '@storybook/test';

type CodingComponentPropsAndCustomArgs = React.ComponentProps<typeof Tabs> & {
  tabCount: number;
};

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'common/tabs/Tabs',
  component: Tabs
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    tabCount: 1,
    onTabChange: fn()
  },
  render: args => {
    const items = Array.from(Array(args.tabCount).keys()).map(n => {
      return {
        label: 'Tab ' + n,
        content: 'Tab Content ' + n
      };
    });
    return (
      <Tabs {...args}>
        {items.map((item, index) => {
          return (
            <Tab key={index} label={item.label}>
              {item.content}
            </Tab>
          );
        })}
      </Tabs>
    );
  }
} satisfies Story;

export const Primary: Story = {
  name: 'One tab',
  args: {
    ...Template.args
  },
  render: Template.render
};
export const Secondary: Story = {
  name: 'Tow tabs',
  args: {
    ...Template.args,
    tabCount: 2
  },
  render: Template.render
};
export const Third: Story = {
  name: 'Six tabs',
  args: {
    ...Template.args,
    tabCount: 6
  },
  render: Template.render
};
export const Forth: Story = {
  name: 'Seven tabs',
  args: {
    ...Template.args,
    tabCount: 7
  },
  render: Template.render
};
export const Fifth: Story = {
  name: 'Hundred tabs',
  args: {
    ...Template.args,
    tabCount: 100
  },
  render: Template.render
};

export const Sixth: Story = {
  name: 'Hundred tabs with long names',
  args: {
    ...Template.args,
    tabCount: 100
  },
  render: args => {
    const items = Array.from(Array(args.tabCount).keys()).map(n => {
      return {
        label: 'Tab ' + n + ': dsaddddds addssd',
        content: 'Tab Content ' + n
      };
    });
    return (
      <Tabs {...args}>
        {items.map((item, index) => {
          return (
            <Tab key={index} label={item.label}>
              {item.content}
            </Tab>
          );
        })}
      </Tabs>
    );
  }
};
export const Seventh: Story = {
  name: 'Hundred tabs + page size = 3',
  args: {
    ...Template.args,
    tabCount: 100,
    pageSize: 3
  },
  render: Template.render
};
