import React from 'react';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { LottoPickGrid } from '../LottoPickGrid/LottoPickGrid';
import { LottoPickRow } from '../LottoPickRow/LottoPickRow';
import './LottoGame.css';

interface LottoGameState {
  selectedValues: (number | null)[];
  selectedPowerBall: number | null;
  isLoading?: boolean;
  error?: string;
}

interface LottoGameProps {
}

/**
 * Component that represents an instance of a lotto game.
 * Contains a primary lotto number pick grid with numbers 1-35 with 7 selectable numbers
 * and a single powerball selection grid numbered 1-20 with 1 selectable powerball
 * 
 * Also contains buttons to autofill based on last lotto draw, or reset the election
 */
class LottoGame extends React.Component<LottoGameProps, LottoGameState> {
  constructor(props: LottoGameProps) {
    super(props);
    this.state = this.getDefaultState()
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
          <LottoPickRow pickedLottoNumbers={this.state.selectedValues} selectedPowerBall={this.state.selectedPowerBall} />
          <div className="pick-buttons">
            <button id="autofill-button" className={"circle-button"} onClick={() => this.handleAutofillClick()}></button>
            <button id="reset-button" className={"circle-button"} onClick={() => this.handleResetClicked()}></button>
          </div>
        </div>
        <LottoPickGrid
          startNumber={1}
          endNumber={35}
          cellsPerRow={10}
          pickedLottoNumbers={this.state.selectedValues}
          onLottoNumberClicked={(selectedNumber) => this.handlePrimaryLottoNumberPicked(selectedNumber)} />
        <div className="powerball-section header">Select Your Powerball</div>
        <LottoPickGrid
          startNumber={1}
          endNumber={20}
          cellsPerRow={10}
          pickedLottoNumbers={[this.state.selectedPowerBall]}
          onLottoNumberClicked={(selectedNumber) => this.handlePowerballPicked(selectedNumber)} />
        <div>{this.state.error}</div>
      </div>
    );
  }

  private getDefaultState(): LottoGameState {
    return {
      selectedValues: new Array(7).fill(null),
      selectedPowerBall: null
    };
  }

  private fetchLatestLottoResults() {
    return axios.post("https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults",
      {
        CompanyId: "GoldenCasket",
        MaxDrawCountPerProduct: 1,
        OptionalProductFilter: ["Powerball"]
      });
  }

  private handleResetClicked() {
    this.resetValues();
  }

  private handlePrimaryLottoNumberPicked(selectedNumber: number) {
    const pickedLottoNumbers = this.state.selectedValues.slice(); // New list to keep imutability paradigm

    // Important indexes based on the current selected number
    let selectedNumberIndex = pickedLottoNumbers.indexOf(selectedNumber);
    let firstNullIndex = pickedLottoNumbers.indexOf(null);

    // Check if the number is already selected, if it is then set it to null
    if (selectedNumberIndex >= 0) {
      pickedLottoNumbers[selectedNumberIndex] = null;
      // If not then replace the first null value
    } else if (firstNullIndex >= 0) {
      pickedLottoNumbers[firstNullIndex] = selectedNumber;
    }

    this.setState({
      selectedValues: pickedLottoNumbers
    });
  }

  private handlePowerballPicked(selectedPowerBall: number) {
    // If the selected powerball value is the same (then we are unselecting it), othewise that is the new powerball
    this.setState({
      selectedPowerBall: selectedPowerBall === this.state.selectedPowerBall ? null : selectedPowerBall
    });
  }

  private resetValues() {
    this.setState(this.getDefaultState());
  }

  private handleAutofillClick() {
    this.resetValues();
    this.setState({
      isLoading: true
    });

    this.fetchLatestLottoResults().then((response: AxiosResponse) => {
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

export default LottoGame;
