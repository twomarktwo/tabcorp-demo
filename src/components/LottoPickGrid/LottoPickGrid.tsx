import React from 'react';
import { LottoCell } from '../LottoCell/LottoCell';
import './LottoPickGrid.css';

interface LottoPickGridProps {
  startNumber: number;
  endNumber: number;
  cellsPerRow: number;
  pickedLottoNumbers?: (number | null)[];
  onLottoNumberClicked?: (pickedLottoNumber: number) => void;
}

export const LottoPickGrid: React.FC<LottoPickGridProps> = (props: LottoPickGridProps) => {
  const rows: React.ReactElement[] = [];
  let currentRowCells: React.ReactElement[] = [];

  // Build each cell
  for (let cellNumber = props.startNumber; cellNumber <= props.endNumber; cellNumber++) {
    let cellIsSelected: boolean = (props.pickedLottoNumbers != null && props.pickedLottoNumbers.indexOf(cellNumber) >= 0);
    currentRowCells.push(<LottoCell
      lottoNumber={cellNumber}
      key={cellNumber}
      selected={cellIsSelected}
      onClick={(selectedNumber) => props.onLottoNumberClicked && props.onLottoNumberClicked(selectedNumber)} />);

    // If we have reached the last cell in the row then create the row
    if (cellNumber % props.cellsPerRow === 0) {
      let rowNumber = cellNumber / props.cellsPerRow;
      rows.push(<div className="lotto-pick-row" key={rowNumber}>{currentRowCells}</div>);
      currentRowCells = [];
    }
  }

  // If the last row is 'patially' full then finish creating it
  if (currentRowCells.length > 0) {
    let rowNumber = props.endNumber / props.cellsPerRow;
    rows.push(<div className="lotto-pick-row" key={rowNumber}>{currentRowCells}</div>);
  }

  return (
    <div className="lotto-grid">
      {rows}
    </div>
  );
}
