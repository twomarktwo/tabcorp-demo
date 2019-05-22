import React from 'react';
import './LottoPickGrid.css';
import {LottoCell} from './LottoCell';

interface LottoPickGridProps {
  startNumber: number;
  endNumber: number;
  cellsPerRow: number;
}

export const LottoPickGrid: React.FC<LottoPickGridProps> = (props : LottoPickGridProps) => {
  const rows : React.ReactElement[] = [];   
  let currentRowCells : React.ReactElement[] = [];
  
  // Build each cell
  for(let cellNumber = props.startNumber; cellNumber<=props.endNumber; cellNumber++) {
    currentRowCells.push(<LottoCell numberValue={cellNumber} key={cellNumber} />);
    
    // If we have reached the last cell in the row then create the row
    if(cellNumber % props.cellsPerRow == 0) {
      let rowNumber = cellNumber / props.cellsPerRow;
      rows.push(<div className="number-row" key={rowNumber}>{currentRowCells}</div>);
      currentRowCells=[];
    }
  }

  // If the last row is 'patially' full then finish creating it
  if(currentRowCells.length > 0){
    let rowNumber = props.endNumber/ props.cellsPerRow;
    rows.push(<div className="number-row" key={rowNumber}>{currentRowCells}</div>);
  }

  return (
    <div className="lotto-grid">
      {rows}
    </div>
  );
}
