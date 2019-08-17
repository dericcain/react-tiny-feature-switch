import React from 'react';

export type ElseProps = {
  children: React.ReactNode | any;
};

export function Else({ children = null }: ElseProps) {
  return children;
}

Else.displayName = 'FeatureElse';
