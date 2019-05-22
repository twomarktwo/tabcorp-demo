import React from 'react';
import { create  } from "react-test-renderer";
import {LottoPickGrid} from './LottoPickGrid';
import {LottoCell} from '../LottoCell/LottoCell';

describe("Test Lotto Pick Grid", ()=> {

  it('contains 35 lotto cells none selected', () => {
    var appComponent = create(<LottoPickGrid startNumber={1} endNumber={35} cellsPerRow={10} />);
    const rootInstance = appComponent.root;
    const cells = rootInstance.findAllByType(LottoCell, {deep: true});
    expect(cells.length).toBe(35);

    // Check the cells are numbered 1-35
    for (let i = 0; i < 35; i++) {
      let checkCellNumber = i +1;
      expect(cells[i].props.numberValue).toBe(checkCellNumber);
      expect(cells[i].props.selected).toBe(false);
    }
  });

  it('contains 35 lotto cells some selected', () => {
    var selectedValues = [1,13,32];

    var appComponent = create(<LottoPickGrid startNumber={1} endNumber={35} cellsPerRow={10} selectedNumbers={selectedValues} />);
    const rootInstance = appComponent.root;
    const cells = rootInstance.findAllByType(LottoCell, {deep: true});
    expect(cells.length).toBe(35);

    // Check the cells are numbered 1-35
    for (let i = 0; i < 35; i++) {
      let checkCellNumber = i +1 ;
      expect(cells[i].props.numberValue).toBe(checkCellNumber);
    }

    var selectedCells = cells.filter(cell=>cell.props.selected);
    expect(selectedCells.length).toBe(3);
    expect(selectedCells[0].props.numberValue).toBe(selectedValues[0]);
    expect(selectedCells[1].props.numberValue).toBe(selectedValues[1]);
    expect(selectedCells[2].props.numberValue).toBe(selectedValues[2]);
  });
});
