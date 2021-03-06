import React from 'react';
import { WidgetBox } from './Widgets.styles';

export default function WidgetBoxComponent({ children, style, height, padding }) {
  return (
    <WidgetBox
      className="isoWidgetBox"
      height={height}
      padding={padding}
      style={style}
    >
      {children}
    </WidgetBox>
  );
}
