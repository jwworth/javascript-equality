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

    const axis = [
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
    ];
    const onePartedArray = axis.map(() => axis.slice(0));
    const dataModel = axis.map((xValue, index) =>
      onePartedArray[index].map(yValue => (yValue === xValue ? 1 : 0))
    );

    this.state = {
      axis,
      dataModel,
    };
  }

  displayName = (value, scope) =>
    typeof value === 'string' || value instanceof String ? (
      <th scope={scope} key={value}>
        "{`${value}`}"
      </th>
    ) : (
      <th scope={scope} key={value}>{`${value}`}</th>
    );

  render() {
    return (
      <table>
        <thead>
          <tr>
            <td />
            {this.state.axis.map(value => this.displayName(value, 'col'))}
          </tr>
        </thead>
        <tbody>
          {this.state.dataModel.map((row, index) => {
            return (
              <tr key={row}>
                {this.displayName(this.state.axis[index], 'row')}
                {row.map(boolean => {
                  return (
                    <td
                      key={boolean}
                      style={{
                        background: boolean === 1 ? 'lightblue' : 'white',
                        width: '50px',
                        height: '50px',
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
