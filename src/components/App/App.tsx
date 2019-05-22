import React from 'react';
import axios from 'axios';
import './App.css';
import { LottoPickGrid } from '../LottoPickGrid/LottoPickGrid';
import { SelectedNumberRow } from '../SelectedNumberRow/SelectedNumberRow';

interface ApplicationState {
  selectedValues: number[];
  selectedPowerBall: number | null;
  isLoading: boolean;
  error?: string;
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
    var loadingOverlayClasses = ["loading-spinner-overlay"];
    if (this.state.isLoading) { loadingOverlayClasses.push('loading'); }

    return (
      <div className="app">
        <div className={loadingOverlayClasses.join(" ")}>
          <div className="loading-spinner"><img src="/images/loading-spinner.svg" /></div>
        </div>
        <div className="picked-row">
          <SelectedNumberRow selectedValues={this.state.selectedValues} selectedPowerBall={this.state.selectedPowerBall} />
          <div className="pick-buttons">
            <button id="autofill-button" className={"circle-button"} onClick={() => this.handleAutofillClick()}></button>
            <button id="reset-button" className={"circle-button"} onClick={() => this.handleResetClicked()}></button>
          </div>
        </div>
        <LottoPickGrid startNumber={1} endNumber={35} cellsPerRow={10} selectedNumbers={this.state.selectedValues} />
        <div className="powerball-section header">Select Your Powerball</div>
        <LottoPickGrid startNumber={1} endNumber={20} cellsPerRow={10} selectedNumbers={this.state.selectedPowerBall !== null ? [this.state.selectedPowerBall] : []} />
        <div>{this.state.error}</div>
      </div>
    );
  }

  fetchLatestLottoResults() {
    return axios.post("https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults",
      {
        CompanyId: "GoldenCasket",
        MaxDrawCountPerProduct: 1,
        OptionalProductFilter: ["Powerball"]
      });
  }

  handleResetClicked() {
    this.resetValues();
  }

  resetValues() {
    this.setState({
      selectedValues: [],
      selectedPowerBall: null
    });
  }

  handleAutofillClick() {
    this.resetValues();
    this.setState({
      isLoading: true
    });

    this.fetchLatestLottoResults().then((response) => {
      let selectedValues = response.data.DrawResults[0].PrimaryNumbers;
      let selectedPowerBall = response.data.DrawResults[0].SecondaryNumbers[0];
      this.setState({
        selectedValues: selectedValues || [],
        selectedPowerBall: selectedPowerBall
      });
    }).catch(error => {
      this.setState(({ error: "An error occurred while trying to 'autofill'" }))
    }).finally(() => {
      this.setState({
        isLoading: false
      });
    });
  }
}

export default App;
