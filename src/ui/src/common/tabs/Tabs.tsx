import React, { ReactElement, useId } from 'react';
import { TabProps } from './Tab';
type TabsProps = {
  pageSize?: number;
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
  className?: string;
  classNamePrevButton?: string;
  onTabChange?: (index: number) => void;
};
export const Tabs: React.FC<TabsProps> = ({
  pageSize = 6,
  children,
  className,
  classNamePrevButton,
  onTabChange
}: TabsProps) => {
  const id = useId();
  const [activeTab, setActiveTab] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const _setActiveTab = (index: number) => {
    if (activeTab === index) {
      return;
    }
    if (onTabChange !== undefined) {
      onTabChange(index);
    }
    setActiveTab(index);
  };
  const tabCount = React.Children.count(children);
  if (tabCount < activeTab + 1) {
    setActiveTab(activeTab - 1);
    onTabChange && onTabChange(activeTab - 1);
  }
  const paginatedChildren = paginate(
    React.Children.toArray(children) as ReactElement<TabProps>[],
    page,
    pageSize
  );
  return (
    <>
      <div
        role="tablist"
        className={'tabs tabs-bordered grid-cols-' + pageSize + ' ' + className}
        style={{
          gridTemplateColumns:
            '25px repeat(' +
            pageSize +
            ', calc(calc(100% - 50px)/' +
            pageSize +
            '))' +
            ' 25px'
        }}
      >
        <button
          disabled={page === 0}
          className={
            'btn btn-xs rounded-none flex self-center btn-square ' +
            classNamePrevButton
          }
          style={{ gridRowStart: 1 }}
          onClick={() => {
            setPage(page - 1);
            setActiveTab((page - 1) * pageSize);
          }}
        >
          «
        </button>

        {paginatedChildren.map((child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              _id: id,
              _index: index + page * pageSize,
              _isActive: index + page * pageSize === activeTab,
              _setActiveTab: _setActiveTab
            });
          }
          return child;
        })}
        <button
          disabled={(page + 1) * pageSize + 1 > tabCount}
          className="btn btn-xs rounded-none flex self-center "
          style={{ gridRowStart: 1, justifySelf: 'left' }}
          onClick={() => {
            setPage(page + 1);
            setActiveTab((page + 1) * pageSize);
          }}
        >
          »
        </button>
      </div>
    </>
  );
};

const paginate = (
  array: ReactElement<TabProps>[],
  currentPage: number,
  pageSize: number
): ReactElement<TabProps>[] => {
  const startIndex = currentPage * pageSize;
  return array.splice(startIndex, pageSize);
};
