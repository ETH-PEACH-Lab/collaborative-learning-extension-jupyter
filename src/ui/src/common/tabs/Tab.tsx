import React, { useEffect } from 'react';
export type TabProps = {
  children: React.ReactNode;
  label: string;
  hide?: boolean;
  className?: string;
  classNameContent?: string;
} & TabsManageableProps;
export type TabsManageableProps = {
  _id?: string;
  _index?: number;
  _isActive?: boolean;
  _setActiveTab?: (index: number) => void;
  onActiveTab?: () => void;
};
export const Tab: React.FC<TabProps> = (props: TabProps) => {
  useEffect(() => {
    if (props._isActive) {
      props.onActiveTab && props.onActiveTab();
    }
  }, [props._isActive]);
  return !props.hide ? (
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
        onClick={() => {
          props._setActiveTab && props._setActiveTab(props._index ?? 0);
        }}
      />
      <div
        role="tabpanel"
        className={'tab-content bg-base-100 ' + props.classNameContent}
      >
        {' '}
        {props._isActive && props.children}
      </div>
    </>
  ) : (
    <></>
  );
};
