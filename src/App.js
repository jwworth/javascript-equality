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
    const { view } = this.state;
    const newView = view === 'twoquals' ? 'threequals' : 'twoquals';

    this.setState({ view: newView });
  };

  displayName = (value, scope) => {
    if (typeof value === 'string' || value instanceof String) {
      return (
        <th scope={scope} key={value}>
          "{`${value}`}"
        </th>
      );
    } else if (typeof value === 'array' || value instanceof Array) {
      return (
        <th scope={scope} key={value}>
          {JSON.stringify(value)}
        </th>
      );
    } else if (typeof value === 'object' || value instanceof Object) {
      return (
        <th scope={scope} key={value}>
          {JSON.stringify(value)}
        </th>
      );
    } else {
      return <th scope={scope} key={value}>{`${value}`}</th>;
    }
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.toggleView}>Toggle View</button>
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
                <tr key={index}>
                  {this.displayName(this.state.axis[index], 'row')}
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
