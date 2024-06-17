import React from 'react';
export type TabProps = {
  _id?: string;
  _index?: number;
  _isActive?: boolean;
  _setActiveTab?: (index: number) => void;
  children: React.ReactNode;
  label: string;
  hide?: boolean;
  className?: string;
  classNameContent?: string;
};
export const Tab: React.FC<TabProps> = (props: TabProps) => {
  return (
    <>
      {' '}
      {!props.hide && (
        <>
          <input
            type="radio"
            name={props._id}
            role="tab"
            className={
              'inline-block tab ' +
              (props._isActive ? 'tab-active' : '') +
              ' ' +
              props.className
            }
            aria-label={props.label}
            style={{
              width: '100%',
              wordBreak: 'break-all',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
            onClick={() =>
              props._setActiveTab && props._setActiveTab(props._index ?? 0)
            }
          />
          <div
            role="tabpanel"
            className={'tab-content bg-base-100 ' + props.classNameContent}
          >
            {props.children}
          </div>
        </>
      )}
    </>
  );
};
