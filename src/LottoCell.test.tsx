import React from 'react';
import { create  } from "react-test-renderer";
import {LottoCell} from './LottoCell';

describe("Test Lotto Cell", ()=> {

  it('Contains Simple Value', () => {
    var appComponent = create(<LottoCell numberValue={1} />);
    const rootInstance = appComponent.root;
    const cellButton = rootInstance.findByType("button");

    // Test the value inside the button
    expect(cellButton.children[0]).toBe("1");
  });

});
