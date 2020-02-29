import './css/normalize.css';
import './css/skeleton.css';
import './css/app.scss';

import React, { useState } from 'react';
import classNames from 'classnames';

import { generateAxis, generateModel } from './utils/generators';

const twoquals = 'twoquals';
const threequals = 'threequals';

const App: React.FunctionComponent<{}> = () => {
  const [axis, _setAxis] = useState(generateAxis);
  const [dataModel, _setDataModel] = useState(generateModel);
  const [view, setView] = useState(twoquals);

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

  const twoqualsView = view === twoquals;
  const threequalsView = !twoqualsView;
  const viewIcon = (view: string): string => (twoqualsView ? '==' : '===');

  return (
    <div className="app">
      <h1>JavaScript Equality</h1>
      <h2>
        {view} (<code>{viewIcon(view)}</code>)
      </h2>
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
                  key={index}
                  className={classNames('cell', { equal: (cell as any)[view] })}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="padding_bottom">
        <button
          className={classNames({ active: twoqualsView })}
          onClick={() => setView(twoquals)}
        >
          Twoquals
        </button>
        <button
          className={classNames({ active: threequalsView })}
          onClick={() => setView(threequals)}
        >
          Threequals
        </button>
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
          "My advice is to never use the evil twins. Instead, always use{' '}
          <code>===</code> and <code>!==</code>." — Douglas Crawford
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
