var x = document.querySelector('tbody'); // gets elements with css selector
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
    var dateCB = document.querySelector('#check_checkdate');
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
    else{
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
    var col = document.querySelector('.timeCol');
    if(col.style.visibility!=="collapse"){
        col.style.visibility="collapse";
    }
    else col.style.visibility="visible";
}
function closeType(){
    var col = document.querySelector('.typeCol');
    if(col.style.visibility!=="collapse"){
        col.style.visibility="collapse";
    }
    else col.style.visibility="visible";
}
function closeIncome(){
    var col = document.querySelector('.incCol');
    if(col.style.visibility!=="collapse"){
        col.style.visibility="collapse";
    }
    else col.style.visibility="visible";
}
function closeOutcome(){
    var col = document.querySelector('.outcCol');
    if(col.style.visibility!=="collapse"){
        col.style.visibility="collapse";
    }
    else col.style.visibility="visible";
}