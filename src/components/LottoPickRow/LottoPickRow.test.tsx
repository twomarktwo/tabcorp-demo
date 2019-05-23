import React from 'react';
import { create } from "react-test-renderer";
import { LottoPickRow } from './LottoPickRow';
import { LottoPick } from '../LottoPick/LottoPick';

describe("Test Lotto Pick Grid", () => {
  it('contains 7 empty normal pick ball elements and 1 empty powerball pickball element', () => {
    var appComponent = create(<LottoPickRow pickedLottoNumbers={new Array(7).fill(null)} selectedPowerBall={null} />);
    const rootInstance = appComponent.root;
    const cells = rootInstance.findAllByType(LottoPick, { deep: true });
    expect(cells.length).toBe(8);

    // Check the cells are numbered 1-35
    for (let i = 0; i < 7; i++) {
      expect(cells[i].props.pickedLottoNumber).toBeNull();
      expect(cells[i].props.isPowerball).toBeFalsy();
    }

    // First cell should be "the next" ball
    expect(cells[0].props.isNextPick).toBe(true);
    expect(cells.filter(cell => cell.props.isNextPick).length).toBe(1);

    // Powerball
    expect(cells[7].props.pickedLottoNumber).toBeNull();
    expect(cells[7].props.isPowerball).toBe(true);
  });

  it('contains 7 normal pick ball elements and 1 powerball pickball element all with picked numbers', () => {
    var appComponent = create(<LottoPickRow pickedLottoNumbers={[1, 13, 14, 20, 21, 32, 33]} selectedPowerBall={13} />);
    const rootInstance = appComponent.root;
    const cells = rootInstance.findAllByType(LottoPick, { deep: true });
    expect(cells.length).toBe(8);

    // Check the cells have thier picked numbers
    expect(cells[0].props.pickedLottoNumber).toBe(1);
    expect(cells[1].props.pickedLottoNumber).toBe(13);
    expect(cells[2].props.pickedLottoNumber).toBe(14);
    expect(cells[3].props.pickedLottoNumber).toBe(20);
    expect(cells[4].props.pickedLottoNumber).toBe(21);
    expect(cells[5].props.pickedLottoNumber).toBe(32);
    expect(cells[6].props.pickedLottoNumber).toBe(33);

    // Check the powerball has it's picked number
    expect(cells[7].props.pickedLottoNumber).toBe(13);

    // No cells should be 'the next' ball
    expect(cells.filter(cell => cell.props.isNextPick).length).toBe(0);
  });

  it('contains 7 normal pick ball elements and 1 powerball pickball element all with picked numbers aaaa', () => {
    var appComponent = create(<LottoPickRow pickedLottoNumbers={[1, 13, 14, null, 21, 32, 33]} selectedPowerBall={13} />);
    const rootInstance = appComponent.root;
    const cells = rootInstance.findAllByType(LottoPick, { deep: true });
    expect(cells.length).toBe(8);

    // Check the cells have thier picked numbers
    expect(cells[0].props.pickedLottoNumber).toBe(1);
    expect(cells[1].props.pickedLottoNumber).toBe(13);
    expect(cells[2].props.pickedLottoNumber).toBe(14);
    expect(cells[3].props.pickedLottoNumber).toBeNull();
    expect(cells[4].props.pickedLottoNumber).toBe(21);
    expect(cells[5].props.pickedLottoNumber).toBe(32);
    expect(cells[6].props.pickedLottoNumber).toBe(33);

    // 4th cell should be "the next" ball
    expect(cells[3].props.isNextPick).toBe(true);
    expect(cells.filter(cell => cell.props.isNextPick).length).toBe(1);

    // Check the powerball has it's picked number
    expect(cells[7].props.pickedLottoNumber).toBe(13);
  });
});
