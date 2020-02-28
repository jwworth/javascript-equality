import './css/normalize.css';
import './css/app.css';

import React, { useState } from 'react';

import { generateAxis, generateModel } from './utils/generators';

const App: React.FunctionComponent<{}> = () => {
  const [axis, setAxis] = useState(generateAxis);
  const [dataModel, setDataModel] = useState(generateModel);
  const [view, setView] = useState('twoquals');

  const displayName = (value: any): string => {
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

  const viewIcon = (view: string): string =>
    view === 'twoquals' ? '==' : '===';

  return (
    <div className="app">
      <h1>
        {view} (<code>{viewIcon(view)}</code>)
      </h1>
      <table>
        <thead>
          <tr>
            <td />
            {axis.map((value, index) => (
              <th scope="col" key={index} className="columnName">
                {displayName(value)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataModel.map((row, index) => (
            <tr key={index}>
              <th scope="row" className="rowName">
                {displayName(axis[index])}
              </th>
              {row.map((cell, index) => (
                <td
                  className="cell"
                  key={index}
                  style={{
                    background: (cell as any)[view] ? '#52ae99' : 'inherit',
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="padding_bottom">
        <button onClick={() => setView('twoquals')}>Twoquals</button>
        <button onClick={() => setView('threequals')}>Threequals</button>
      </div>

      <div className="padding_bottom">
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
