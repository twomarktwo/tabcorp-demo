import React from 'react';
import './App.css';
import {LottoPickGrid} from './LottoPickGrid';

const App: React.FC = () => {
  return (
    <div className="app">
      <LottoPickGrid startNumber={1} endNumber={35} cellsPerRow={10} />
      <div className="select-powerball-seperator">Select Your Powerball</div>
      <LottoPickGrid startNumber={1} endNumber={20} cellsPerRow={10} />
    </div>    
  );
}

export default App;
