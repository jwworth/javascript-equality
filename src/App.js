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

    const axis = [true, false, 1, 0, -1, 'true', 'false'];
    const onePartedArray = axis.map(() => axis.slice(0));
    const dataModel = axis.map((xValue, index) =>
      onePartedArray[index].map(yValue => (yValue === xValue ? 1 : 0))
    );

    this.state = {
      axis,
      dataModel,
    };
  }

  displayName = value =>
    typeof value === 'string' || value instanceof String ? (
      <th scope="col" key={value}>
        "{`${value}`}"
      </th>
    ) : (
      <th scope="col" key={value}>{`${value}`}</th>
    );

  render() {
    return (
      <table>
        <thead>
          <tr>
            <td />
            {this.state.axis.map(value => this.displayName(value))}
          </tr>
        </thead>
        <tbody>
          {this.state.dataModel.map((row, index) => {
            return (
              <tr key={row}>
                <th scope="row" style={{ height: '40px' }}>{`${this.state.axis[
                  index
                ]}`}</th>
                {row.map(boolean => {
                  return (
                    <td
                      key={boolean}
                      style={{
                        background: boolean === 1 ? 'lightblue' : 'white',
                        width: '40px',
                        height: '40x',
                        border: '1px solid lightgray',
                      }}
                    />
                  );
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
