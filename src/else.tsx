import React from 'react';

export type ElseProps = {
  children: React.ReactNode | any;
};

export function Else({ children }: ElseProps) {
  return children;
}

Else.displayName = 'FeatureElse';
