import React from 'react';
import './SelectedNumberRow.css';
import { PickedBall } from '../PickedBall/PickedBall';

interface SelectedNumberRowProps {
  selectedValues: number[];
  selectedPowerBall: number | null;
}

export const SelectedNumberRow: React.FC<SelectedNumberRowProps> = (props: SelectedNumberRowProps) => {
  const mainPickedBalls: React.ReactElement[] = [];

  // Build regular "picked" ball elements
  for (let i = 0; i < 7; i++) {
    const selectedValue = props.selectedValues.length - 1 >= i ? props.selectedValues[i] : null; 
    mainPickedBalls.push(<PickedBall pickedNumber={selectedValue} emptyValue="" key={i} />)
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
