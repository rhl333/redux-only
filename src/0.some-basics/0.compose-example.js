// trying to implement the compose method from redux.
// it just takes multiple functions as argument and start execution them from right to left and pass the result of
// one to next one.

const returnCap = (string = '') => string.toUpperCase();
const returnBold = (string = '') => string.bold();
const returnSmall = (string = '') => string.toLowerCase();

const myCompose = (...funs) => {
  if (funs.length === 0) return (arg) => arg;
  if (funs.length === 1) return funs[0];
  return funs.reduce((prev, curr) => (arg) => prev(curr(arg)));
};

const test = myCompose(returnSmall, returnBold, returnCap);
console.log(test('hello'));
