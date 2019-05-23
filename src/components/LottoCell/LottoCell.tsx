import React from 'react';
import './LottoCell.css';

interface LottoCellProps {
  numberValue: number;
  selected: boolean;
  onClick?: (numberValue: number) => void;
}

export const LottoCell: React.FC<LottoCellProps> = (props: LottoCellProps) => {
  var classes = ["number-cell"];
  if (props.selected) { classes.push("selected"); }

  return (
    <button className={classes.join(" ")} onClick={() => props.onClick && props.onClick(props.numberValue)}>
      {props.numberValue}
    </button>
  );
}
