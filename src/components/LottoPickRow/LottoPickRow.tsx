import React from 'react';
import { LottoPick } from '../LottoPick/LottoPick';
import './LottoPickRow.css';

interface LottoPickRowProps {
  pickedLottoNumbers: (number | null)[];
  selectedPowerBall: number | null;
}

/**
 * Component that contains a row of "selected lotto numbers" in the order they were selected with 1 powerball
 * @param props The parameters of the possible selected lotto numbers and the powerball
 * @param props.pickedLottoNumbers The array of primary lotto number picks, an element will be rendered for each of these values. 
 *                                 null means 'unpicked'. The first null represents the next lotto number to be picked
 * @param props.selectedPowerBall The powerball picked number. null means 'unpicked'
 */
export const LottoPickRow: React.FC<LottoPickRowProps> = (props: LottoPickRowProps) => {
  const primaryPickedLottoElements: React.ReactElement[] = [];
  const firstNullIndex = props.pickedLottoNumbers.indexOf(null);

  // The Primary "picked" lotto elements
  for (let i = 0; i < props.pickedLottoNumbers.length; i++) {
    primaryPickedLottoElements.push(
      <LottoPick
        isNextPick={firstNullIndex === i}
        pickedLottoNumber={props.pickedLottoNumbers[i]}
        key={i} />
    );
  }

  return (
    <div>
      {primaryPickedLottoElements}
      <LottoPick pickedLottoNumber={props.selectedPowerBall} isPowerball={true} />
    </div>
  );
}
