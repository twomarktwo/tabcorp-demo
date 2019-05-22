import React from 'react';
import ReactDOM from 'react-dom';
import { create  } from "react-test-renderer";
import App from './App';
import {LottoCell} from './LottoCell';
import {LottoPickGrid} from './LottoPickGrid';

describe("Test Application Setup", ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Contains 2 Lotto Pick Grids', () => {
    var appComponent = create(<App />);
    const rootInstance = appComponent.root;
    const pickGrids = rootInstance.findAllByType(LottoPickGrid, {deep: true});
    expect(pickGrids.length).toBe(2);
  });

  it('Contains a main Lotto Pick Grid with numbers 1-35', () => {
    var appComponent = create(<App />);
    const rootInstance = appComponent.root;
    const pickGrids = rootInstance.findAllByType(LottoPickGrid, {deep: true});
    const mainPickGrid = pickGrids[0];
    expect(mainPickGrid.props.startNumber).toBe(1);
    expect(mainPickGrid.props.endNumber).toBe(35);
  });
  
  it('Contains a Powerball Lotto Pick Grid with numbers 1-20', () => {
    var appComponent = create(<App />);
    const rootInstance = appComponent.root;
    const pickGrids = rootInstance.findAllByType(LottoPickGrid, {deep: true});
    const powerBallGrid = pickGrids[1];
    expect(powerBallGrid.props.startNumber).toBe(1);
    expect(powerBallGrid.props.endNumber).toBe(20);
  });
});
