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

    const numbers = ['1', '2', '3'];
    const letters = ['a', 'b', 'c'];

    const numbersArray = [['1', '2', '3'], ['1', '2', '3'], ['1', '2', '3']];

    const dataModel = letters.map((letter, index) => {
      return numbersArray[index].map(number => number + letter);
    });

    this.state = {
      dataModel,
    };
  }

  render() {
    return (
      <table>
        <tbody>
          {this.state.dataModel.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((pairing, index) => {
                  return <td>{pairing}</td>;
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
