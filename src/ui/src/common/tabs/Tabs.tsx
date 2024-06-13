import React, { ReactElement, useId } from 'react';
import { TabProps } from './Tab';
type TabsProps = {
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
  onTabChange?: (index: number) => void;
};
export const Tabs: React.FC<TabsProps> = ({
  children,
  onTabChange
}: TabsProps) => {
  const id = useId();
  const [activeTab, setActiveTab] = React.useState(0);
  const _setActiveTab = (index: number) => {
    if (activeTab === index) {
      return;
    }
    if (onTabChange !== undefined) {
      onTabChange(index);
    }
    setActiveTab(index);
  };
  return (
    <div role="tablist" className="tabs tabs-bordered">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            _id: id,
            _index: index,
            _isActive: index === activeTab,
            _setActiveTab: _setActiveTab
          });
        }
        return child;
      })}
    </div>
  );
};
