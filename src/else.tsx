import React from 'react';

export type ElseProps = {
  children: React.ReactNode | any;
};

export default function Else({ children = null }: ElseProps) {
  return children;
}

Else.displayName = 'FeaturesElse';
