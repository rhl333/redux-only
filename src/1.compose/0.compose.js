import { compose } from 'redux';

const sum = (num1, num2) => num1 + num2;

const square = (num) => num * num;

const test = compose(square, sum);
console.log(test(10, 10));
