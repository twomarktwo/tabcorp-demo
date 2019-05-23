import React from 'react';
import './LottoCell.css';

interface LottoCellProps {
  lottoNumber: number;
  selected: boolean;
  onClick?: (numberValue: number) => void;
}

/**
 * Component that represents a selectable "Lotto Number" Cell
 * @param props The component properties
 * @param props.lottoNumber The "Lotto Number" the cell represents
 * @param props.selected Set to true if the loto cell is selected
 * @param props.onClick Callback for when the cell is clicked
 */
export const LottoCell: React.FC<LottoCellProps> = (props: LottoCellProps) => {
  const classes = ["lotto-cell"];
  if (props.selected) { classes.push("selected"); }

  return (
    <button className={classes.join(" ")} onClick={() => props.onClick && props.onClick(props.lottoNumber)}>
      {props.lottoNumber}
    </button>
  );
}
