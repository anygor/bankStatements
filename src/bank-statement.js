var x = document.querySelector('tbody'); // gets elements with css selector
for(var i = 0; i < myStatementData.length; i++){
    const date = myStatementData[i].date;
    var amount = myStatementData[i].amount;
    var dateString = parseDate(date);
    var timeString = parseTime(date);

    const dateCell = document.createElement('td');
    dateCell.innerText = dateString;
    x.appendChild(dateCell);

    const timeCell = document.createElement('td');
    timeCell.innerText = timeString;
    x.appendChild(timeCell);

    const typeCell = document.createElement('td');
    typeCell.innerText = myStatementData[i].type;
    x.appendChild(typeCell);

    var amountString;
    if (amount > 0) {
        const incomeCell = document.createElement('td');
        amountString = amount.toLocaleString('ru-RU') + ' ₽';
        incomeCell.innerText = amountString;
        x.appendChild(incomeCell);
        x.appendChild(document.createElement('td'));
    }
    else {
        amount = Math.abs(amount);
        amountString = amount.toLocaleString('ru-RU') + ' ₽';
        x.appendChild(document.createElement('td'));
        const outcomeCell = document.createElement('td');
        outcomeCell.innerText = amountString;
        x.appendChild(outcomeCell);
    }

    const cell = document.createElement('tr');
    x.appendChild(cell);
}

function parseDate(dateStr){
    var date = new Date(dateStr);
    var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
    return date.toLocaleString('ru-RU', options);

}

function parseTime(dateStr){
    var date = new Date(dateStr);
    var options = {hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return date.toLocaleTimeString('ru-RU', options);
}