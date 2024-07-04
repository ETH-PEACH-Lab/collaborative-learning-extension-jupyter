import React from 'react';
import { ReactSVG } from 'react-svg';
type SVGProps = {
  icon: string;
};
export const SVG: React.FC<SVGProps> = ({ icon }) => {
  return icon.includes('<svg') ? (
    <span dangerouslySetInnerHTML={{ __html: icon }}></span>
  ) : (
    <ReactSVG src={icon}></ReactSVG>
  );
};
