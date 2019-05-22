import React from 'react';
import { create  } from "react-test-renderer";
import {LottoCell} from './LottoCell';

describe("Test Lotto Cell", ()=> {

  it('contains a simple value text without selected styling', () => {
    var appComponent = create(<LottoCell numberValue={1} selected={false} />);
    const rootInstance = appComponent.root;
    const cellButton = rootInstance.findByType("button");

    // Test the value inside the button
    expect(cellButton.children[0]).toBe("1");
    expect(cellButton.props.className).toBe("number-cell");
  });
  
  it('contains a simple value text with selected styling', () => {
    var appComponent = create(<LottoCell numberValue={1} selected={true} />);
    const rootInstance = appComponent.root;
    const cellButton = rootInstance.findByType("button");

    // Test the value inside the button
    expect(cellButton.children[0]).toBe("1");
    expect(cellButton.props.className).toBe("number-cell selected");
  });
});
