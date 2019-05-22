import React from 'react';
import { create  } from "react-test-renderer";
import {SelectedNumberRow} from './SelectedNumberRow';
import {PickedBall} from '../PickedBall/PickedBall';

describe("Test Lotto Pick Grid", ()=> {

  it('contains 7 empty normal pick ball elements and 1 empty powerball pickball element', () => {
    var appComponent = create(<SelectedNumberRow selectedValues={[]} selectedPowerBall={null} />);
    const rootInstance = appComponent.root;
    const cells = rootInstance.findAllByType(PickedBall, {deep: true});
    expect(cells.length).toBe(8);

    // Check the cells are numbered 1-35
    for (let i = 0; i < 7; i++) {
      expect(cells[i].props.pickedNumber).toBeNull();
      expect(cells[i].props.emptyValue).toBe("");
    }

    // Powerball
    expect(cells[7].props.pickedNumber).toBeNull();
    expect(cells[7].props.emptyValue).toBe("PB");
  });

  it('contains 7 normal pick ball elements and 1 powerball pickball element all with picked numbers', () => {
    var appComponent = create(<SelectedNumberRow selectedValues={[1,13,14,20,21,32,33]} selectedPowerBall={13} />);
    const rootInstance = appComponent.root;
    const cells = rootInstance.findAllByType(PickedBall, {deep: true});
    expect(cells.length).toBe(8);

    // Check the cells have thier picked numbers
    expect(cells[0].props.pickedNumber).toBe(1);
    expect(cells[1].props.pickedNumber).toBe(13);
    expect(cells[2].props.pickedNumber).toBe(14);
    expect(cells[3].props.pickedNumber).toBe(20);
    expect(cells[4].props.pickedNumber).toBe(21);
    expect(cells[5].props.pickedNumber).toBe(32);
    expect(cells[6].props.pickedNumber).toBe(33);

    // Check the powerball has it's picked number
    expect(cells[7].props.pickedNumber).toBe(13);
  });
});
