import React from 'react';
import { create  } from "react-test-renderer";
import {PickedBall} from './PickedBall';

describe("Test Picked Ball", ()=> {

  it('has correct style and value when it contains a picked number', () => {
    var appComponent = create(<PickedBall pickedNumber={13} emptyValue="" />);
    const rootInstance = appComponent.root;
    const cellButton = rootInstance.findByType("button");

    // Test the value inside the button
    expect(cellButton.children[0]).toBe("13");
    expect(cellButton.props.className).toBe("picked-ball has-value");
  });


  it('has correct style and value when it does not contain a picked number', () => {
    var appComponent = create(<PickedBall pickedNumber={null}  emptyValue="" />);
    const rootInstance = appComponent.root;
    const cellButton = rootInstance.findByType("button");

    // Test the value inside the button
    expect(cellButton.children[0]).toBe("");
    expect(cellButton.props.className).toBe("picked-ball");
  });
  
  it('has correct style and value when it does not contain a picked number', () => {
    var appComponent = create(<PickedBall pickedNumber={null}  emptyValue="" />);
    const rootInstance = appComponent.root;
    const cellButton = rootInstance.findByType("button");

    // Test the value inside the button
    expect(cellButton.children[0]).toBe("");
    expect(cellButton.props.className).toBe("picked-ball");
  });

});
