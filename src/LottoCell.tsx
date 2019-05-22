import React from 'react';
import './LottoCell.css';

interface LottoCellProps {
  numberValue: number;
}

export const LottoCell: React.FC<LottoCellProps> = (props : LottoCellProps) => {
  return (
    <button className="number-cell">
      {props.numberValue}
    </button>
  );
}
