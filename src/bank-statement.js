var x = document.querySelector('tbody'); // gets elements with css selector
var dateCB = document.querySelector('#check_checkdate');
var timeCB = document.querySelector('#check_checktime');
var typeCB = document.querySelector('#check_checktype');
var incomeCB = document.querySelector('#check_checkincome');
var outcomeCB = document.querySelector('#check_checkoutcome');
dateCB.checked = true;
timeCB.checked = true;
typeCB.checked = true;
incomeCB.checked = true;
outcomeCB.checked = true;

for(var i = 0; i < myStatementData.length; i++){

    const currentRow = document.createElement('tr');
    x.appendChild(currentRow);

    const date = myStatementData[i].date;
    var amount = myStatementData[i].amount;
    var dateString = parseDate(date);
    var timeString = parseTime(date);

    const dateCell = document.createElement('td');
    dateCell.innerText = dateString;
    dateCell.className = "date";
    currentRow.appendChild(dateCell);

    const timeCell = document.createElement('td');
    timeCell.innerText = timeString;
    timeCell.className = "time";
    currentRow.appendChild(timeCell);

    const typeCell = document.createElement('td');
    typeCell.innerText = myStatementData[i].type;
    typeCell.className = "type";
    currentRow.appendChild(typeCell);

    var amountString;
    if (amount > 0) {
        const incomeCell = document.createElement('td');
        amountString = amount.toLocaleString('ru-RU') + ' ₽';
        incomeCell.innerText = amountString;
        incomeCell.className = "income";
        currentRow.appendChild(incomeCell);
        const outcomeCell = document.createElement('td');
        outcomeCell.className = "outcome";
        currentRow.appendChild(outcomeCell);
    }
    else {
        amount = Math.abs(amount);
        amountString = amount.toLocaleString('ru-RU') + ' ₽';
        currentRow.appendChild(document.createElement('td'));
        const outcomeCell = document.createElement('td');
        outcomeCell.className = "outcome";
        outcomeCell.innerText = amountString;
        currentRow.appendChild(outcomeCell);
    }
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


function closeDate(){
    var rowsLength = x.rows.length;
    var col = 0;
    var tr, td;
    var dateHeader = document.querySelector('#dateHeader');
    console.log(dateCB.checked);
    if(dateCB.checked){
        console.log("true");
        dateCB.checked=false;
        dateHeader.style.display="none";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="none";
        }
    }
    else if (!dateCB.checked){
        console.log("false");
        dateCB.checked=true;
        dateHeader.style.display="table-cell";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="table-cell";
        }
    }
}
function closeTime(){
    var rowsLength = x.rows.length;
    var col = 1;
    var tr, td;
    var timeHeader = document.querySelector('#timeHeader');
    console.log(timeCB.checked);
    if(timeCB.checked){
        console.log("true");
        timeCB.checked=false;
        timeHeader.style.display="none";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="none";
        }
    }
    else if (!timeCB.checked){
        console.log("false");
        timeCB.checked=true;
        timeHeader.style.display="table-cell";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="table-cell";
        }
    }
}
function closeType(){
    var rowsLength = x.rows.length;
    var col = 2;
    var tr, td;
    var typeHeader = document.querySelector('#typeHeader');
    console.log(typeCB.checked);
    if(typeCB.checked){
        console.log("true");
        typeCB.checked=false;
        typeHeader.style.display="none";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="none";
        }
    }
    else if (!typeCB.checked){
        console.log("false");
        typeCB.checked=true;
        typeHeader.style.display="table-cell";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="table-cell";
        }
    }
}
function closeIncome(){
    var rowsLength = x.rows.length;
    var col = 3;
    var tr, td;
    var incomeHeader = document.querySelector('#incomeHeader');
    console.log(incomeCB.checked);
    if(incomeCB.checked){
        console.log("true");
        incomeCB.checked=false;
        incomeHeader.style.display="none";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="none";
        }
    }
    else if (!incomeCB.checked){
        console.log("false");
        incomeCB.checked=true;
        incomeHeader.style.display="table-cell";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="table-cell";
        }
    }
}
function closeOutcome(){
    var rowsLength = x.rows.length;
    var col = 4;
    var tr, td;
    var outcomeHeader = document.querySelector('#outcomeHeader');
    console.log(outcomeCB.checked);
    if(outcomeCB.checked){
        console.log("true");
        outcomeCB.checked=false;
        outcomeHeader.style.display="none";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="none";
        }
    }
    else if (!outcomeCB.checked){
        console.log("false");
        outcomeCB.checked=true;
        outcomeHeader.style.display="table-cell";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="table-cell";
        }
    }
}

function nogroup(){
    timeCB.checked = false;
    typeCB.checked = false;
    closeTime();
    closeType();

}
function group(){
    timeCB.checked = true;
    typeCB.checked = true;
    closeType();
    closeTime();

    var old_tbody = document.querySelector('tbody');
    var new_tbody = document.createElement('tbody');
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);

    var sumDay = new Map();

    for (var i = 0; i < myStatementData.length; i++){
        var amount = myStatementData[i].amount;
        const date = myStatementData[i].date;
        var dateString = parseDate(date);

        if(!sumDay.has(dateString)){
            sumDay.set(dateString, amount);
        }
        else{
            var currentAmount = sumDay.get(dateString);
            sumDay.set(dateString, currentAmount + amount);
        }
    }
    var mapIter = sumDay.keys();

    var currentRow = document.createElement('tr');
    x.appendChild(currentRow);

    const dateCell = document.createElement('td');
    dateCell.innerText = mapIter.next().value;
    dateCell.className = "date";
    currentRow.appendChild(dateCell);
}