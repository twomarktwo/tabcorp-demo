import React from 'react';
import axios from 'axios';
import './App.css';
import { LottoPickGrid } from '../LottoPickGrid/LottoPickGrid';
import { PickedBall } from '../PickedBall/PickedBall';

interface ApplicationState {
  selectedValues: number[];
  selectedPowerBall: number | null;
  isLoading: boolean;
}

interface ApplicationProps {
}

class App extends React.Component<ApplicationProps, ApplicationState> {
  constructor(props: ApplicationProps) {
    super(props);
    this.state = {
      selectedValues: [],
      selectedPowerBall: null,
      isLoading: false
    };
  }

  render() {
    return (
      <div className="app">
        <div className="picked-row">
          <PickedBall pickedNumber={this.state.selectedValues.length - 1 >= 0 ? this.state.selectedValues[0] : null} emptyValue=" " />
          <PickedBall pickedNumber={this.state.selectedValues.length - 1 >= 1 ? this.state.selectedValues[1] : null} emptyValue=" " />
          <PickedBall pickedNumber={this.state.selectedValues.length - 1 >= 2 ? this.state.selectedValues[2] : null} emptyValue=" " />
          <PickedBall pickedNumber={this.state.selectedValues.length - 1 >= 3 ? this.state.selectedValues[3] : null} emptyValue=" " />
          <PickedBall pickedNumber={this.state.selectedValues.length - 1 >= 4 ? this.state.selectedValues[4] : null} emptyValue=" " />
          <PickedBall pickedNumber={this.state.selectedValues.length - 1 >= 5 ? this.state.selectedValues[5] : null} emptyValue=" " />
          <PickedBall pickedNumber={this.state.selectedValues.length - 1 >= 6 ? this.state.selectedValues[6] : null} emptyValue=" " />
        <PickedBall pickedNumber={this.state.selectedPowerBall} emptyValue="PB" />
        </div>
        <button id="autofill-button" className={"circle-button"} onClick={() => this.handleAutofillClick()}>autofill</button>
        <LottoPickGrid startNumber={1} endNumber={35} cellsPerRow={10} selectedNumbers={this.state.selectedValues} />
        <div className="select-powerball-seperator">Select Your Powerball</div>
        <LottoPickGrid startNumber={1} endNumber={20} cellsPerRow={10} selectedNumbers={this.state.selectedPowerBall !== null ? [this.state.selectedPowerBall] : []}/>
      </div>
    );
  }

  fetchLatestLottoResults() {
    return axios.post("https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults", 
      { CompanyId: "GoldenCasket", 
        MaxDrawCountPerProduct: 1,
        OptionalProductFilter: ["Powerball"]
      });
  }

  handleAutofillClick() {
    this.setState({
      selectedValues:[],
      selectedPowerBall: null,
      isLoading: true
    });

    this.fetchLatestLottoResults().then((response) => {
      this.setState({
        selectedValues: response.data.DrawResults[0].PrimaryNumbers,
        selectedPowerBall: response.data.DrawResults[0].SecondaryNumbers[0]
      });
    }).catch(error => {

    }).finally(()=> {

    });   
  }
}

export default App;
