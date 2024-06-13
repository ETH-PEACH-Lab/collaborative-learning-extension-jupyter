import React from 'react';
export type TabProps = {
  _id?: string;
  _index?: number;
  _isActive?: boolean;
  _setActiveTab?: (index: number) => void;
  children: React.ReactNode;
  label: string;
  hide?: boolean;
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
            className={'tab ' + (props._isActive ? 'tab-active' : '')}
            aria-label={props.label}
            style={{ width: 'max-content' }}
            onClick={() =>
              props._setActiveTab && props._setActiveTab(props._index ?? 0)
            }
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            {props.children}
          </div>
        </>
      )}
    </>
  );
};
