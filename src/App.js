import './normalize.css';
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div
        style={{
          padding: '30px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#3d3d3d',
        }}
      >
        <Equals />
      </div>
    );
  }
}

class Equals extends React.Component {
  constructor(props) {
    super(props);

    const onePartedArray = this.axis().map(() => this.axis().slice(0));
    const dataModel = this.axis().map((xValue, index) =>
      onePartedArray[index].map(yValue => ({
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

  toggleView = () => {
    const newView = this.nextView();
    this.setState({ view: newView });
  };

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
    const { axis, dataModel, view } = this.state;

    return (
      <div
        style={{
          display: 'inlineBlock',
          padding: '50px',
        }}
      >
        <div style={{ paddingBottom: '30px' }}>
          <h1>{this.state.view}</h1>
        </div>
        <table style={{ margin: '0 auto', marginBottom: '20px' }}>
          <thead>
            <tr>
              <td />
              {axis.map((value, index) => (
                <th
                  scope="col"
                  key={index}
                  style={{
                    transform: 'rotate(-90deg)',
                    maxWidth: '20px',
                    maxHeight: '20px',
                  }}
                >
                  {this.displayName(value)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataModel.map((row, index) => (
              <tr key={index}>
                <th scope="row">
                  {this.displayName(axis[index])}
                </th>
                {row.map((cell, index) => (
                  <td
                    key={index}
                    style={{
                      background: cell[view] ? '#654EA3' : '#fff',
                      width: '20px',
                      height: '20px',
                      border: '1px solid lightgray',
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={this.toggleView}>{this.nextView()}</button>
      </div>
    );
  }
}

export default App;
