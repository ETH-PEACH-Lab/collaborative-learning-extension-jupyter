import { type Meta } from '@storybook/react';
import React from 'react';
import { Content } from '../../../common/content/Content';
import { DeepStoryObj } from '../../StoryObj';
import {
  addAboveIcon,
  addBelowIcon,
  deleteIcon
} from '@jupyterlab/ui-components';
import { fn } from '@storybook/test';
import { Indicator, MarkdownEditor } from '../../../common';
import {
  ContentBody,
  Toolbar,
  ToolbarButton,
  ToolbarToggle
} from '../../../common/content';
type CodingComponentPropsAndCustomArgs = React.ComponentProps<typeof Content>;

const meta: Meta<CodingComponentPropsAndCustomArgs> = {
  title: 'common/content/Content',
  component: Content
};

export default meta;

type Story = DeepStoryObj<typeof meta>;
const Template = {
  args: {
    children: 'children'
  },
  render: args => {
    return <Content {...args} />;
  }
} satisfies Story;
export const Primary: Story = {
  name: 'Base example',
  args: {
    ...Template.args
  },
  render: Template.render
};
export const WithBody: Story = {
  name: 'With content body',
  args: {
    children: 'text'
  },
  render: args => {
    return (
      <Content>
        <ContentBody>{args.children}</ContentBody>
      </Content>
    );
  }
};
export const WithToolbar: Story = {
  name: 'With toolbar and buttons',
  args: {
    children: 'text'
  },
  render: args => {
    return (
      <Content>
        <Toolbar>
          <ToolbarButton icon={addAboveIcon.svgstr} onClick={fn} />
          <ToolbarButton icon={addBelowIcon.svgstr} onClick={fn} />
          <ToolbarButton icon={deleteIcon.svgstr} onClick={fn} />
        </Toolbar>
        <ContentBody>{args.children}</ContentBody>
      </Content>
    );
  }
};
export const WithToolbarAndMultiline: Story = {
  name: 'With toolbar and buttons and multiline text',
  args: {
    children: 'text'
  },
  render: args => {
    return (
      <Content>
        <Toolbar>
          <ToolbarButton icon={addAboveIcon.svgstr} onClick={fn} />
          <ToolbarButton icon={addBelowIcon.svgstr} onClick={fn} />
          <ToolbarButton icon={deleteIcon.svgstr} onClick={fn} />
        </Toolbar>
        <ContentBody>
          {args.children}
          <br />
          {args.children}
        </ContentBody>
      </Content>
    );
  }
};

export const WithToolbarButtonsAndSwitch: Story = {
  name: 'With toolbar and buttons and toogle switch',
  args: {
    children: 'text'
  },
  render: args => {
    return (
      <Content>
        <Toolbar>
          <ToolbarToggle label="Show Solution" onChange={fn()} checked={true} />
          <ToolbarToggle label="Visibility" onChange={fn()} checked={true} />
          <ToolbarButton icon={addAboveIcon.svgstr} onClick={fn} />
          <ToolbarButton icon={addBelowIcon.svgstr} onClick={fn} />
          <ToolbarButton icon={deleteIcon.svgstr} onClick={fn} />
        </Toolbar>
        <ContentBody>
          {args.children}
          <br />
          {args.children}
        </ContentBody>
      </Content>
    );
  }
};

export const WithToolbarButtonsSwitchAndContent: Story = {
  name: 'With toolbar and buttons and toogle switch and some Indicator',
  args: {
    children: 'text'
  },
  render: args => {
    return (
      <Content>
        <Toolbar>
          <ToolbarToggle label="Show Solution" onChange={fn()} checked={true} />
          <ToolbarToggle label="Visibility" onChange={fn()} checked={true} />
          <ToolbarButton icon={addAboveIcon.svgstr} onClick={fn} />
          <ToolbarButton icon={addBelowIcon.svgstr} onClick={fn} />
          <ToolbarButton icon={deleteIcon.svgstr} onClick={fn} />
        </Toolbar>
        <ContentBody>
          <Indicator label={'test'}>
            {' '}
            <MarkdownEditor onChange={fn} src={'test'}></MarkdownEditor>
          </Indicator>

          <br />
          <Indicator> {args.children}</Indicator>
        </ContentBody>
      </Content>
    );
  }
};

export const WithAbsoluteToolbarButtonsSwitchAndContent: Story = {
  name: 'With absolute toolbar and buttons and toogle switch and some Indicator',
  args: {
    children: 'text'
  },
  render: args => {
    return (
      <Content>
        <Toolbar absolute>
          <ToolbarToggle label="Show Solution" onChange={fn()} checked={true} />
          <ToolbarToggle label="Visibility" onChange={fn()} checked={true} />
          <ToolbarButton icon={addAboveIcon.svgstr} onClick={fn} />
          <ToolbarButton icon={addBelowIcon.svgstr} onClick={fn} />
          <ToolbarButton icon={deleteIcon.svgstr} onClick={fn} />
        </Toolbar>
        <ContentBody>
          <Indicator label={'test'}>
            {' '}
            <MarkdownEditor onChange={fn} src={'test'}></MarkdownEditor>
          </Indicator>

          <br />
          <Indicator> {args.children}</Indicator>
        </ContentBody>
      </Content>
    );
  }
};

export const WithAbsoluteToolbarButtonsSwitchAndContentWithHoverBorder: Story =
  {
    name: 'With absolute toolbar and buttons and toogle switch and some Indicator + hover border',
    args: {
      children: 'text'
    },
    render: args => {
      return (
        <Content borderOnHover>
          <Toolbar absolute>
            <ToolbarToggle
              label="Show Solution"
              onChange={fn()}
              checked={true}
            />
            <ToolbarToggle label="Visibility" onChange={fn()} checked={true} />
            <ToolbarButton icon={addAboveIcon.svgstr} onClick={fn} />
            <ToolbarButton icon={addBelowIcon.svgstr} onClick={fn} />
            <ToolbarButton icon={deleteIcon.svgstr} onClick={fn} />
          </Toolbar>
          <ContentBody>
            <Indicator label={'test'}>
              <MarkdownEditor onChange={fn} src={'test'}></MarkdownEditor>
            </Indicator>

            <br />
            <Indicator> {args.children}</Indicator>
          </ContentBody>
        </Content>
      );
    }
  };
