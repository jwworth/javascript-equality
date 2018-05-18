import './App.css';

import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Equals />
      </div>
    );
  }
}

class Equals extends React.Component {
  constructor(props) {
    super(props);

    const axis = () => [
      true,
      false,
      1,
      0,
      -1,
      'true',
      'false',
      '1',
      '0',
      '-1',
      '',
      null,
      undefined,
      Infinity,
      -Infinity,
      [],
      {},
      [[]],
      [0],
      [1],
      NaN,
    ];

    const onePartedArray = axis().map(() => axis().slice(0));
    const dataModel = axis().map((xValue, index) =>
      onePartedArray[index].map(yValue => {
        return {
          twoquals: yValue == xValue,
          threequals: yValue === xValue,
        };
      })
    );

    this.state = {
      axis: axis(),
      dataModel,
      view: 'twoquals',
    };
  }

  toggleView = () => {
    const newView = this.nextView();
    this.setState({ view: newView });
  };

  nextView = () => (this.state.view === 'twoquals' ? 'threequals' : 'twoquals');

  displayName = value => {
    if (
      typeof value === 'object' ||
      value instanceof Object ||
      value instanceof Array ||
      typeof value === 'string' ||
      value instanceof String
    ) {
      return JSON.stringify(value);
    } else {
      return `${value}`;
    }
  };

  render() {
    const { axis, dataModel } = this.state;

    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <td />
              {axis.map((value, index) => (
                <th scope="col" key={index}>
                  {this.displayName(value)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataModel.map((row, index) => (
              <tr key={index}>
                <th scope="row">
                  {this.displayName(this.state.axis[index])}
                </th>
                {row.map((cell, index) => (
                  <td
                    key={index}
                    style={{
                      background: cell[this.state.view] ? 'green' : 'white',
                      width: '30px',
                      height: '30px',
                      border: '1px solid lightgray',
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={this.toggleView}>{this.nextView()}</button>
      </React.Fragment>
    );
  }
}

export default App;
