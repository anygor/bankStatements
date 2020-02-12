const dateCB = document.querySelector('#check_checkdate');
const timeCB = document.querySelector('#check_checktime');
const typeCB = document.querySelector('#check_checktype');
const incomeCB = document.querySelector('#check_checkincome');
const outcomeCB = document.querySelector('#check_checkoutcome');
dateCB.addEventListener('click', closeColumn);
timeCB.addEventListener('click', closeColumn);
typeCB.addEventListener('click', closeColumn);
incomeCB.addEventListener('click', closeColumn);
outcomeCB.addEventListener('click', closeColumn);
let columnsOpen = 5;

let selectField = document.querySelector('select');
selectField.addEventListener('change', (e) => {
    var selectNewVal1 = e && e.target && e.target.value;
    if (selectNewVal1 === 'По дате'){
        group();
    }
    else if (selectNewVal1 === 'Без группировки'){
        nogroup();
    }
});

nogroup();

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

function closeColumn(){
    const rowsLength = x.rows.length;
    let col;
    let tr, td;
    let header;
    if (this.id === "check_checkdate"){
        col = 0;
        header = document.querySelector('#dateHeader');
    }
    else if (this.id === "check_checktime"){
        col = 1;
        header = document.querySelector('#timeHeader');
    }
    else if (this.id === "check_checktype"){
        col = 2;
        header = document.querySelector('#typeHeader');
    }
    else if (this.id === "check_checkincome"){
        col = 3;
        header = document.querySelector('#incomeHeader');
    }
    else if (this.id === "check_checkoutcome"){
        col = 4;
        header = document.querySelector('#outcomeHeader');
    }
    if(!this.checked){
        header.style.display="none";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="none";
        }
        columnsOpen--;
    }
    else if (this.checked){
        header.style.display="table-cell";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="table-cell";
        }
        columnsOpen++;
    }
    hideCheckboxIfOneColumnRemains();
}

function hideCheckboxIfOneColumnRemains(){
    if(columnsOpen == 1){
        remainingCB = findOpenColumn();
        console.log(remainingCB);
        remainingCB.style.display = "none";
    }
    else if (columnsOpen == 2){
        dateCB.style.display = "table-cell";
        timeCB.style.display = "table-cell";
        typeCB.style.display = "table-cell";
        incomeCB.style.display = "table-cell";
        outcomeCB.style.display = "table-cell";
    }
}

function findOpenColumn(){
    if (dateCB.checked === true) return dateCB;
    if (timeCB.checked === true) return timeCB;
    if (typeCB.checked === true) return typeCB;
    if (incomeCB.checked === true) return incomeCB;
    if (outcomeCB.checked === true) return outcomeCB;
}

function nogroup(){
    var old_tbody = document.querySelector('tbody');
    var new_tbody = document.createElement('tbody');
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);

    const x = document.querySelector('tbody');

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
}
function group(){
    timeCB.closeColumn;
    typeCB.closeColumn;

    var old_tbody = document.querySelector('tbody');
    var new_tbody = document.createElement('tbody');
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);

    const x = document.querySelector('tbody');

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