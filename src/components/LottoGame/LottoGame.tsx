import React from 'react';
import axios from 'axios';
import { AxiosResponse} from 'axios';
import './LottoGame.css';
import { LottoPickGrid } from '../LottoPickGrid/LottoPickGrid';
import { SelectedNumberRow } from '../SelectedNumberRow/SelectedNumberRow';

interface ApplicationState {
  selectedValues: (number | null)[];
  selectedPowerBall: number | null;
  isLoading?: boolean;
  error?: string;
}

interface ApplicationProps {
}

class App extends React.Component<ApplicationProps, ApplicationState> {
  constructor(props: ApplicationProps) {
    super(props);
    this.state = this.getDefaultState()
  }

  getDefaultState() : ApplicationState {
    return {
      selectedValues: new Array(7).fill(null),
      selectedPowerBall: null
    };
  }

  render() {
    var loadingOverlayClasses = ["loading-spinner-overlay"];
    if (this.state.isLoading) { loadingOverlayClasses.push('loading'); }

    return (
      <div className="app">
        <div className={loadingOverlayClasses.join(" ")}>
          <div className="loading-spinner"><img src="/images/loading-spinner.svg" alt="loading" /></div>
        </div>
        <div className="picked-row">
          <SelectedNumberRow selectedValues={this.state.selectedValues} selectedPowerBall={this.state.selectedPowerBall} />
          <div className="pick-buttons">
            <button id="autofill-button" className={"circle-button"} onClick={() => this.handleAutofillClick()}></button>
            <button id="reset-button" className={"circle-button"} onClick={() => this.handleResetClicked()}></button>
          </div>
        </div>
        <LottoPickGrid 
          startNumber={1} 
          endNumber={35} 
          cellsPerRow={10} 
          selectedNumbers={this.state.selectedValues} 
          onNumberClicked={(selectedNumber) => this.handleSelectedNumber(selectedNumber)} />
        <div className="powerball-section header">Select Your Powerball</div>
        <LottoPickGrid 
          startNumber={1} 
          endNumber={20} 
          cellsPerRow={10} 
          selectedNumbers={[this.state.selectedPowerBall]} 
          onNumberClicked={(selectedNumber) => this.handleSelectedPowerball(selectedNumber)} />
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

  handleSelectedNumber(selectedNumber: number) {
    const selectedNumbers = this.state.selectedValues.slice(); // New list to keep imutability paradigm

    // Important indexes based on the current selected number
    let selectedNumberIndex = selectedNumbers.indexOf(selectedNumber);
    let firstNullIndex = selectedNumbers.indexOf(null);

    // Check if the number is already selected, if it is then set it to null
    if (selectedNumberIndex >= 0) {
      selectedNumbers[selectedNumberIndex] = null;
    // If not then replace the first null value
    } else if(firstNullIndex >=0) {
      selectedNumbers[firstNullIndex] = selectedNumber;
    }

    this.setState({
      selectedValues: selectedNumbers
    });
  }

  handleSelectedPowerball(selectedPowerBall : number) {
    // If the selected powerball value is the same (then we are unselecting it), othewise that is the new powerball
    this.setState({
      selectedPowerBall : selectedPowerBall === this.state.selectedPowerBall ? null : selectedPowerBall
    }); 
  }

  resetValues() {
    this.setState(this.getDefaultState());
  }

  handleAutofillClick() {
    this.resetValues();
    this.setState({
      isLoading: true
    });

    this.fetchLatestLottoResults().then((response : AxiosResponse) => {
      let selectedValues = response.data.DrawResults[0].PrimaryNumbers;
      let selectedPowerBall = response.data.DrawResults[0].SecondaryNumbers[0];
      this.setState({
        selectedValues: selectedValues || [],
        selectedPowerBall: selectedPowerBall
      });
    }).catch(error => {
      console.error(error);
      this.setState(({ error: "An error occurred while trying to 'autofill'" }))
    }).finally(() => {
      this.setState({
        isLoading: false
      });
    });
  }
}

export default App;
