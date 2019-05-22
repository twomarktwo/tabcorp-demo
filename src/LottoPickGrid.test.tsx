import React from 'react';
import { create  } from "react-test-renderer";
import {LottoPickGrid} from './LottoPickGrid';
import {LottoCell} from './LottoCell';

describe("Test Lotto Pick Grid", ()=> {

  it('Contains 35 Lotto Cells', () => {
    var appComponent = create(<LottoPickGrid startNumber={1} endNumber={35} cellsPerRow={10} />);
    const rootInstance = appComponent.root;
    const cells = rootInstance.findAllByType(LottoCell, {deep: true});
    expect(cells.length).toBe(35);

    // Check the cells are numbered 1-35
    for (let i = 1; i < 35; i++) {
      let checkCellNumber = i +1;
      expect(cells[i].props.numberValue).toBe(checkCellNumber);
    }
  });

});
