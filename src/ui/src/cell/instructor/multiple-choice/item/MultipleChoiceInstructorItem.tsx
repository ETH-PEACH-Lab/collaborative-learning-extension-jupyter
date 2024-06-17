import {
  deleteIcon,
  moveDownIcon,
  moveUpIcon
} from '@jupyterlab/ui-components';
import { MarkdownEditor, Toolbar, ToolbarButton } from '../../../../common';
import { Content } from '../../../../common/content/Content';
import { ContentBody } from '../../../../common/content/ContentBody';
import React from 'react';
type MultipleChoiceInstructorItemProps = {
  content: string;
  index: number;
  maxIndex: number;
  selected?: boolean;
  optionId: string;
  parentId: string;
  options: {
    multi?: boolean;
    randomOrder?: boolean;
  };

  onItemContentChange: (value: string) => void;
  onSelectionChange: (optionId: string, correct: boolean) => void;
  swapPosition: (index: number, newPos: number) => void;
  remove: () => void;
};
export const MultipleChoiceInstructorItem: React.FC<
  MultipleChoiceInstructorItemProps
> = ({
  content,
  parentId,
  optionId,
  index,
  maxIndex,
  selected,
  options,
  onItemContentChange,
  onSelectionChange,
  swapPosition,
  remove
}: MultipleChoiceInstructorItemProps) => {
  return (
    <Content>
      <Toolbar showOnHover={false}>
        <ToolbarButton
          hide={options.randomOrder}
          disabled={index === 0}
          icon={moveUpIcon.svgstr}
          onClick={() => {
            const newPos = index - 1;
            swapPosition(index, newPos);
          }}
        ></ToolbarButton>
        <ToolbarButton
          hide={options.randomOrder}
          disabled={maxIndex === index}
          icon={moveDownIcon.svgstr}
          onClick={() => {
            const newPos = index + 1;
            swapPosition(index, newPos);
          }}
        ></ToolbarButton>
        <ToolbarButton
          icon={deleteIcon.svgstr}
          onClick={remove}
        ></ToolbarButton>
      </Toolbar>
      <ContentBody>
        <div className="flex flex-row">
          <div className="flex-grow">
            <MarkdownEditor
              src={content}
              onChange={onItemContentChange}
            ></MarkdownEditor>
          </div>
          <label className="label">
            <div className="cursor-pointer">
              {options.multi ? (
                <input
                  type="checkbox"
                  onChange={value =>
                    onSelectionChange(optionId, value.target.checked)
                  }
                  checked={selected}
                  className="checkbox checkbox-sm"
                />
              ) : (
                <input
                  type="radio"
                  name={'radio-' + parentId}
                  className="radio radio-sm"
                  defaultChecked={selected}
                  onChange={value =>
                    onSelectionChange(optionId, value.target.checked)
                  }
                />
              )}
            </div>
          </label>
        </div>
      </ContentBody>
    </Content>
  );
};
