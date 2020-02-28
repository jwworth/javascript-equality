export const generateAxis = () => [
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

const comparatorArray = generateAxis().map(() => generateAxis().slice(0));

export const generateModel = () =>
  generateAxis().map((xValue, index) =>
    comparatorArray[index].map(yValue => ({
      // eslint-disable-next-line
      twoquals: yValue == xValue,
      threequals: yValue === xValue,
    }))
  );
