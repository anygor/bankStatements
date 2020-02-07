var x = document.querySelector('tbody'); // gets elements with css selector
for(var i = 0; i < myStatementData.length; i++){
    const dateString = myStatementData[i].date;
    const indexT = dateString.indexOf('T');
    const amount = myStatementData[i].amount;

    const dateCell = document.createElement('td');
    dateCell.innerText = (dateString).substring(0, indexT);
    x.appendChild(dateCell);

    const timeCell = document.createElement('td');
    timeCell.innerText = (dateString).substring(indexT + 1);
    x.appendChild(timeCell);

    const typeCell = document.createElement('td');
    typeCell.innerText = myStatementData[i].type;
    x.appendChild(typeCell);

    if (amount > 0) {
        const incomeCell = document.createElement('td');
        incomeCell.innerText = amount;
        x.appendChild(incomeCell);
        x.appendChild(document.createElement('td'));
    }
    else {
        x.appendChild(document.createElement('td'));
        const outcomeCell = document.createElement('td');
        outcomeCell.innerText = Math.abs(amount);
        x.appendChild(outcomeCell);
    }

    const cell = document.createElement('tr');
    x.appendChild(cell);
}