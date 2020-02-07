var x = document.querySelector('tbody'); // gets elements with css selector
const cell = document.createElement('td');
cell.innerText = 'hello'
x.appendChild(cell);
console.log(x);