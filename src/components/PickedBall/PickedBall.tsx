import React from 'react';
import './PickedBall.css';

interface PickedBallProps {
  pickedNumber: number | null;
  emptyValue: string;
  isNextPick?: boolean;
}

export const PickedBall: React.FC<PickedBallProps> = (props : PickedBallProps) => {
  let hasValue = props.pickedNumber !== null;
  var classes = ["picked-ball"];
  if(hasValue) { classes.push("has-value");}
  if(props.isNextPick) { classes.push("next-pick"); }

  return (
    <div className={classes.join(" ")}>
      {hasValue ? props.pickedNumber : props.emptyValue}
    </div>
  );
}
