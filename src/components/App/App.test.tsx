import React from 'react';
import axios from "axios";
import {AxiosPromise} from 'axios';
import ReactDOM from 'react-dom';
import { create  } from "react-test-renderer";
import App from './App';
import {LottoPickGrid} from '../LottoPickGrid/LottoPickGrid';


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

  it('Contains a "Main" Lotto Pick Grid with numbers 1-35', () => {
    var appComponent = create(<App />);
    const rootInstance = appComponent.root;
    const pickGrids = rootInstance.findAllByType(LottoPickGrid, {deep: true});
    const mainPickGrid = pickGrids[0];
    expect(mainPickGrid.props.startNumber).toBe(1);
    expect(mainPickGrid.props.endNumber).toBe(35);
  });
  
  it('contains a "Powerball" Lotto Pick Grid with numbers 1-20', () => {
    var appComponent = create(<App />);
    const rootInstance = appComponent.root;
    const pickGrids = rootInstance.findAllByType(LottoPickGrid, {deep: true});
    const powerBallGrid = pickGrids[1];
    expect(powerBallGrid.props.startNumber).toBe(1);
    expect(powerBallGrid.props.endNumber).toBe(20);
  });

  it('has correct values after autofill', (done) => {
    // Mock the API request
    // Important details are the "PrimaryNumbers": [11, 13, 35, 34, 1, 17, 24] and "SecondaryNumbers": [19]
    const mockPost = jest.spyOn(axios, 'post');
    mockPost.mockImplementationOnce(() =>
      Promise.resolve({
        data: { "DrawResults": [{ "ProductId": "Powerball", "DrawNumber": 1200, "DrawDate": "2019-05-16T00:00:00", "DrawDisplayName": "Powerball Draw 1200", "DrawLogoUrl": "http://media.tatts.com/TattsServices/Lotto/Products/Powerball_v1.png", "PrimaryNumbers": [11, 13, 35, 34, 1, 17, 24], "SecondaryNumbers": [19], "TicketNumbers": null, "Dividends": [{ "Division": 1, "BlocNumberOfWinners": 1, "BlocDividend": 8000000.0000, "CompanyId": "GoldenCasket", "CompanyNumberOfWinners": 0, "CompanyDividend": 8000000.0000, "PoolTransferType": "NONE", "PoolTransferredTo": 0 }, { "Division": 2, "BlocNumberOfWinners": 2, "BlocDividend": 93464.3500, "CompanyId": "GoldenCasket", "CompanyNumberOfWinners": 0, "CompanyDividend": 93464.3500, "PoolTransferType": "NONE", "PoolTransferredTo": 0 }, { "Division": 3, "BlocNumberOfWinners": 20, "BlocDividend": 5711.7000, "CompanyId": "GoldenCasket", "CompanyNumberOfWinners": 5, "CompanyDividend": 5711.7000, "PoolTransferType": "NONE", "PoolTransferredTo": 0 }, { "Division": 4, "BlocNumberOfWinners": 421, "BlocDividend": 493.3500, "CompanyId": "GoldenCasket", "CompanyNumberOfWinners": 129, "CompanyDividend": 493.3500, "PoolTransferType": "NONE", "PoolTransferredTo": 0 }, { "Division": 5, "BlocNumberOfWinners": 944, "BlocDividend": 165.0000, "CompanyId": "GoldenCasket", "CompanyNumberOfWinners": 186, "CompanyDividend": 165.0000, "PoolTransferType": "NONE", "PoolTransferredTo": 0 }, { "Division": 6, "BlocNumberOfWinners": 14019, "BlocDividend": 71.8500, "CompanyId": "GoldenCasket", "CompanyNumberOfWinners": 2819, "CompanyDividend": 71.8500, "PoolTransferType": "NONE", "PoolTransferredTo": 0 }, { "Division": 7, "BlocNumberOfWinners": 18076, "BlocDividend": 43.6500, "CompanyId": "GoldenCasket", "CompanyNumberOfWinners": 3630, "CompanyDividend": 43.6500, "PoolTransferType": "NONE", "PoolTransferredTo": 0 }, { "Division": 8, "BlocNumberOfWinners": 89301, "BlocDividend": 17.4500, "CompanyId": "GoldenCasket", "CompanyNumberOfWinners": 17888, "CompanyDividend": 17.4500, "PoolTransferType": "NONE", "PoolTransferredTo": 0 }, { "Division": 9, "BlocNumberOfWinners": 261133, "BlocDividend": 10.4500, "CompanyId": "GoldenCasket", "CompanyNumberOfWinners": 52766, "CompanyDividend": 10.4500, "PoolTransferType": "NONE", "PoolTransferredTo": 0 }] }], "ErrorInfo": null, "Success": true }
      }) as AxiosPromise
    );

    var appComponent = create(<App />);
    const rootInstance = appComponent.root;

    // Find the autofill button
    const autofillButton = rootInstance.findAllByType("button").filter(a=>a.children && a.children.length == 1 && a.children[0] === "autofill" )[0];
    autofillButton.props.onClick(); // Simulate the click of the autofill
    let instance = appComponent.getInstance();

    // Allow render loop to be called then assert the grids have had the selected values set
    setImmediate(()=> {
      const pickGrids = rootInstance.findAllByType(LottoPickGrid, {deep: true});

      const mainPickGrid = pickGrids[0];
      expect(mainPickGrid.props.selectedNumbers.length).toBe(7);
      expect(mainPickGrid.props.selectedNumbers[0]).toBe(11);
      expect(mainPickGrid.props.selectedNumbers[1]).toBe(13);
      expect(mainPickGrid.props.selectedNumbers[2]).toBe(35);
      expect(mainPickGrid.props.selectedNumbers[3]).toBe(34);
      expect(mainPickGrid.props.selectedNumbers[4]).toBe(1);
      expect(mainPickGrid.props.selectedNumbers[5]).toBe(17);
      expect(mainPickGrid.props.selectedNumbers[6]).toBe(24);

      const powerBallGrid = pickGrids[1];
      expect(powerBallGrid.props.selectedNumbers.length).toBe(1);
      expect(powerBallGrid.props.selectedNumbers[0]).toBe(19);
      done();
    })
  });

});
