import React from 'react';
import './LottoPick.css';

interface LottoPickProps {
  pickedLottoNumber: number | null;
  isPowerball?: boolean;
  isNextPick?: boolean;
}

/**
 * A component that represents the state of a selected lotto number.
 * It can contain a selected lotto number, or be empty if no lotto number is selected
 * @param props 
 * @param props.pickedLottoNumber The lotto number that has been picked 'null' for this cell holder
 * @param props.isPowerball True if the component will host the powerball pick
 * @param props.isNextPick True if the cell is going to contain the next selected lotto number
 */
export const LottoPick: React.FC<LottoPickProps> = (props: LottoPickProps) => {
  const hasValue = props.pickedLottoNumber !== null;
  const classes = ["lotto-pick"];
  if (hasValue) { classes.push("has-value"); }
  if (props.isNextPick) { classes.push("next-pick"); }
  if (props.isPowerball) { classes.push("powerball"); }

  // Cell contains the picked lotto number that belongs to it, if is empty and is the powerball then we also display a 'PB' indicator
  var cellValue = hasValue ? props.pickedLottoNumber : (props.isPowerball ? "PB" : "");

  return (
    <div className={classes.join(" ")}>
      {cellValue}
    </div>
  );
}
