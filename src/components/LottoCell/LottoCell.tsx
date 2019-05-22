import React from 'react';
import './LottoCell.css';

interface LottoCellProps {
  numberValue: number;
  selected: boolean;
}

export const LottoCell: React.FC<LottoCellProps> = (props : LottoCellProps) => {
  var classes = ["number-cell"];
  if(props.selected) { classes.push("selected");}

  return (
    <button className={classes.join(" ")}>
      {props.numberValue}
    </button>
  );
}
