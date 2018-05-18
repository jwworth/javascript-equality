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
      axis,
      comparator: '===',
      dataModel,
    };
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <td />
            {this.state.axis.map(value => (
              <th scope="col" key={value}>{`${value}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.state.dataModel.map((row, index) => {
            return (
              <tr key={row}>
                <th scope="row">{`${this.state.axis[index]}`}</th>
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
