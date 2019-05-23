import React from 'react';
import './SelectedNumberRow.css';
import { PickedBall } from '../PickedBall/PickedBall';

interface SelectedNumberRowProps {
  selectedValues: (number | null)[];
  selectedPowerBall: number | null;
}

export const SelectedNumberRow: React.FC<SelectedNumberRowProps> = (props: SelectedNumberRowProps) => {
  const mainPickedBalls: React.ReactElement[] = [];
  let firstNullIndex = props.selectedValues.indexOf(null);


  // Build regular "picked" ball elements
  for (let i = 0; i < props.selectedValues.length; i++) {
    mainPickedBalls.push(<PickedBall isNextPick={firstNullIndex === i} pickedNumber={props.selectedValues[i]} emptyValue="" key={i} />)
  }

  return (
    <div>
      {mainPickedBalls}
      <span className="powerball">
        <PickedBall pickedNumber={props.selectedPowerBall} emptyValue="PB" />
      </span>
    </div>
  );
}
