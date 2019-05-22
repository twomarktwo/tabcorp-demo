import React from 'react';
import ReactDOM from 'react-dom';
import { create  } from "react-test-renderer";
import App from './App';

describe("Test Application Setup", ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('contains correct heading', () => {
    // Simple test to check plumbing is working.
    var appComponent = create(<App />);
    const rootInstance = appComponent.root;
    const header = rootInstance.findByType("h1");
    expect(header.children[0]).toBe("Tabcorp Demo");
  });
});
