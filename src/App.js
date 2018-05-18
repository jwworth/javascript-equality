import './App.css';

import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Threequals />
      </div>
    );
  }
}

class Threequals extends React.Component {
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
    return (
      <React.Fragment>
        <button onClick={this.toggleView}>{this.nextView()}</button>
        <table>
          <thead>
            <tr>
              <td />
              {this.state.axis.map((value, index) => {
                return (
                  <th scope="col" key={value}>
                    {this.displayName(value)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.dataModel.map((row, index) => {
              return (
                <tr key={index}>
                  <th scope="row">
                    {this.displayName(this.state.axis[index])}
                  </th>
                  {row.map((cell, index) => {
                    return (
                      <td
                        key={index}
                        style={{
                          background: cell[this.state.view] ? 'green' : 'white',
                          width: '30px',
                          height: '30px',
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
      </React.Fragment>
    );
  }
}

export default App;
