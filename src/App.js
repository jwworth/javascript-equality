import './normalize.css';

import React, { useState } from 'react';

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

const axisValues = () => [
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

const createDataModel = () => {
  const comparatorArray = axisValues().map(() => axisValues().slice(0));

  return axisValues().map((xValue, index) =>
    comparatorArray[index].map(yValue => ({
      // eslint-disable-next-line
      twoquals: yValue == xValue,
      threequals: yValue === xValue,
    }))
  );
};

const EqualityChart = () => {
  const [dataModel] = useState(createDataModel);
  const [view, setView] = useState('twoquals');
  const [axis] = useState(axisValues);

  const displayName = value => {
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

  const viewIcon = currentView => (currentView === 'twoquals' ? '==' : '===');

  return (
    <div style={{ margin: 'auto', width: '600px' }}>
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ textTransform: 'capitalize' }}>
          {view} (<code>{viewIcon(view)}</code>)
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
                {displayName(value)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataModel.map((row, index) => (
            <tr key={index}>
              <th scope="row">{displayName(axis[index])}</th>
              {row.map((cell, index) => (
                <td
                  key={index}
                  style={{
                    background: cell[view] ? '#654ea3' : '#fff',
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
        <button onClick={() => setView('twoquals')}>Twoquals</button>
        <button onClick={() => setView('threequals')}>Threequals</button>
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
          To quote Douglas Crawford: "My advice is to never use the evil twins.
          Instead, always use <code>===</code> and <code>!==</code>
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
};

export default App;
