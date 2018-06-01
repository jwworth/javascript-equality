import './normalize.css';
import React from 'react';

const App = () => (
  <div
    style={{
      color: '#3d3d3d',
      fontSize: '14px',
      textAlign: 'center',
    }}
  >
    <h1>JavaScript Equality</h1>
    <EqualityChart />
  </div>
);

class EqualityChart extends React.Component {
  constructor(props) {
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

  viewIcon = view => (view === 'twoquals' ? '==' : '===');

  render() {
    const { axis, dataModel, view } = this.state;

    return (
      <div style={{ margin: 'auto', width: '600px' }}>
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ textTransform: 'capitalize' }}>
            {view} (<code>{this.viewIcon(view)}</code>)
          </h2>
        </div>
        <table style={{ marginBottom: '20px' }}>
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
                      border: '1px solid #d3d3d3',
                    }}
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
            This application shows the JavaScript value-comparison operators
            {' '}
            <code>==</code>
            {' '}
            and
            {' '}
            <code>===</code>
            {' '}
            in action. It is written in React.js and inspired by the
            {' '}
            <a href="https://dorey.github.io/JavaScript-Equality-Table/">
              JavaScript Equality Table
            </a>.
          </p>
          <p>
            To quote Douglas Crawford: "My advice is to never use the evil twins. Instead, always use
            {' '}
            <code>===</code>
            {' '}
            and
            {' '}
            <code>!==</code>
            ."
          </p>
        </div>

        <div>
          <a href="https://github.com/jwworth/javascript-equality">
            Source code
          </a>
        </div>
      </div>
    );
  }
}

export default App;
