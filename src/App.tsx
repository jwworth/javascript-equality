import React from 'react';

import './css/app.css';

type AppState = {
  axis: any[];
  dataModel: {
    [index: string]: boolean;
    twoquals: boolean;
    threequals: boolean;
  }[][];
  view: string;
};

class App extends React.Component<{}, AppState> {
  constructor(props: object) {
    super(props);

    const comparatorArray = this.axis().map(() => this.axis().slice(0));
    const dataModel = this.axis().map((xValue, index) =>
      comparatorArray[index].map(yValue => ({
        // eslint-disable-next-line
        twoquals: yValue == xValue,
        threequals: yValue === xValue,
      }))
    );

    this.state = {
      axis: this.axis(),
      dataModel,
      view: 'twoquals',
    };
  }

  axis = () => [
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

  displayName = (value: any) => {
    if (
      value instanceof Object ||
      value instanceof Array ||
      value instanceof String ||
      typeof value === 'string'
    ) {
      return JSON.stringify(value);
    } else {
      return `${value}`;
    }
  };

  viewIcon = (view: string) => (view === 'twoquals' ? '==' : '===');

  render() {
    const { axis, dataModel, view } = this.state;

    return (
      <div className="app">
        <h2>
          {view} (<code>{this.viewIcon(view)}</code>)
        </h2>
        <table style={{ marginBottom: '20px' }}>
          <thead>
            <tr>
              <td />
              {axis.map((value, index) => (
                <th scope="col" key={index} className="columnName">
                  {this.displayName(value)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataModel.map((row, index) => (
              <tr key={index}>
                <th scope="row" className="rowName">
                  {this.displayName(axis[index])}
                </th>
                {row.map((cell, index) => (
                  <td
                    key={index}
                    className="cell"
                    style={{ background: cell[view] ? '#654ea3' : '#fff' }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => this.setState({ view: 'twoquals' })}>
            Twoquals
          </button>
          <button onClick={() => this.setState({ view: 'threequals' })}>
            Threequals
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p>
            This application shows the JavaScript value-comparison operators{' '}
            <code>==</code> and <code>===</code> in action. It is written in
            React.js and inspired by the{' '}
            <a href="https://dorey.github.io/JavaScript-Equality-Table/">
              JavaScript Equality Table
            </a>
            .
          </p>
          <p>
            To quote Douglas Crawford: "My advice is to never use the evil
            twins. Instead, always use <code>===</code> and <code>!==</code>
            ."
          </p>
          <p>
            <a href="https://github.com/jwworth/javascript-equality">
              Source code
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
