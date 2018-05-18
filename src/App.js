import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">JS Equality</h1>
        </header>
        <Threequals />
      </div>
    );
  }
}

class Threequals extends React.Component {
  constructor(props) {
    super(props);

    const axis = [true, false, 1];
    const onePartedArray = axis.map(() => axis.slice(0));

    const dataModel = axis.map((xValue, index) =>
      onePartedArray[index].map(number => `${xValue} === ${number}`)
    );

    this.state = {
      comparator: '===',
      dataModel,
    };
  }

  render() {
    return (
      <table>
        <tbody>
          {this.state.dataModel.map(row => {
            return (
              <tr key={row}>
                {row.map(pairing => {
                  return <td key={pairing}>{pairing}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default App;
