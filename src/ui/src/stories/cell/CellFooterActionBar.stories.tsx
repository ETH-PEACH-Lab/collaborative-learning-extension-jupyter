import { type Meta } from '@storybook/react';
import React from 'react';

import { fn } from '@storybook/test';
import { CellFooterActionBar } from '../../cell';
import { DeepStoryObj } from '../StoryObj';
type CellFooterActionBarAndCustomArgs = React.ComponentProps<
  typeof CellFooterActionBar
> & { numberOfTypes: number };

const meta: Meta<CellFooterActionBarAndCustomArgs> = {
  title: 'cell/CellFooterActionBar',
  component: CellFooterActionBar
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    addCell: fn(),
    numberOfTypes: 1
  },
  render: args => {
    const cellTypes = Array.from(Array(args.numberOfTypes).keys()).map(
      index => {
        return { type: 'cell-type-' + index, name: 'Cell Type ' + index };
      }
    );
    return <CellFooterActionBar {...args} types={cellTypes} />;
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
  name: 'Two cell types example',
  args: {
    ...Template.args,
    numberOfTypes: 2
  },
  render: Template.render
};
export const Third: Story = {
  name: 'Three cell types example',
  args: {
    ...Template.args,
    numberOfTypes: 3
  },
  render: Template.render
};
export const Forth: Story = {
  name: 'Hide example',
  args: {
    ...Template.args,
    numberOfTypes: 3,
    hide: true
  },
  render: Template.render
};
