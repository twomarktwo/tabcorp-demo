import React from 'react';
import { create } from "react-test-renderer";
import { LottoPick } from './LottoPick';

describe("Test Picked Ball", () => {
  it('has correct style and value when it contains a picked number', () => {
    var appComponent = create(<LottoPick pickedLottoNumber={13} />);
    const rootInstance = appComponent.root;
    const cellButton = rootInstance.findByType("div");

    // Test the value inside the button
    expect(cellButton.children[0]).toBe("13");
    expect(cellButton.props.className).toBe("lotto-pick has-value");
  });

  it('has correct style and value when it does not contain a picked number', () => {
    var appComponent = create(<LottoPick pickedLottoNumber={null} />);
    const rootInstance = appComponent.root;
    const cellButton = rootInstance.findByType("div");

    // Test the value inside the button
    expect(cellButton.children[0]).toBe("");
    expect(cellButton.props.className).toBe("lotto-pick");
  });

  it('has correct style and value when it does not contain a picked number', () => {
    var appComponent = create(<LottoPick pickedLottoNumber={null} />);
    const rootInstance = appComponent.root;
    const cellButton = rootInstance.findByType("div");

    // Test the value inside the button
    expect(cellButton.children[0]).toBe("");
    expect(cellButton.props.className).toBe("lotto-pick");
  });

  it('has correct style and value when it does not contain a picked number and is the next ball to be picked', () => {
    var appComponent = create(<LottoPick pickedLottoNumber={null} isNextPick={true} />);
    const rootInstance = appComponent.root;
    const cellButton = rootInstance.findByType("div");

    // Test the value inside the button
    expect(cellButton.children[0]).toBe("");
    expect(cellButton.props.className).toBe("lotto-pick next-pick");
  });
});
