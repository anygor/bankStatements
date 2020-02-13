const myStatementDataSorted = myStatementData.sort(compare);

function compare(a, b){
    const dateA = a.date;
    const dateB = b.date;

    let comparison = 0;
    if (dateA >= dateB) {
        comparison = 1;
    } else if (dateA < dateB) {
        comparison = -1;
    }
    return comparison;
}

const dateCB = document.querySelector('#check_checkdate');
const timeCB = document.querySelector('#check_checktime');
const typeCB = document.querySelector('#check_checktype');
const incomeCB = document.querySelector('#check_checkincome');
const outcomeCB = document.querySelector('#check_checkoutcome');

const checkBoxes = document.querySelectorAll(".check_checkbox");
checkBoxes.forEach(function(checkBoxes) {
  checkBoxes.addEventListener('click', closeColumn)
});

let columnsOpen = 5;

let selectField = document.querySelector('select');
selectField.addEventListener('change', (e) => {
    const selectNewVal1 = e && e.target && e.target.value;
    if (selectNewVal1 === 'По дате'){
        group();
    }
    else if (selectNewVal1 === 'Без группировки'){
        nogroup();
    }
});

nogroup();

function parseDate(dateStr){
    const date = new Date(dateStr);
    const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
    return date.toLocaleString('ru-RU', options);

}
function parseTime(dateStr){
    const date = new Date(dateStr);
    const options = {hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return date.toLocaleTimeString('ru-RU', options);
}

function closeColumn(){
    x = document.querySelector('tbody');
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
        remainingCB.disabled = true;
    }
    else if (columnsOpen == 2){
        checkBoxes.forEach(function(checkBoxes) {
            checkBoxes.disabled = false;
          });
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

    checkBoxes.forEach(function(checkBoxes) {
        checkBoxes.disabled = false;
        checkBoxes.checked = true;
    });

    const headers = document.querySelectorAll(".columnHeader");
    headers.forEach(function(headers) {
        headers.style.display = "table-cell";
    });

    const old_tbody = document.querySelector('tbody');
    const new_tbody = document.createElement('tbody');
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);

    const x = document.querySelector('tbody');

    for(let i = 0; i < myStatementDataSorted.length; i++){

        const currentRow = document.createElement('tr');
        x.appendChild(currentRow);
    
        const date = myStatementDataSorted[i].date;
        let amount = myStatementDataSorted[i].amount;
        const dateString = parseDate(date);
        const timeString = parseTime(date);
    
        const dateCell = document.createElement('td');
        dateCell.innerText = dateString;
        dateCell.className = "date";
        currentRow.appendChild(dateCell);
    
        const timeCell = document.createElement('td');
        timeCell.innerText = timeString;
        timeCell.className = "time";
        currentRow.appendChild(timeCell);
    
        const typeCell = document.createElement('td');
        typeCell.innerText = myStatementDataSorted[i].type;
        typeCell.className = "type";
        currentRow.appendChild(typeCell);
    
        fillValues(currentRow, amount);
    }    
}
function group(){
    timeCB.checked = false;
    typeCB.checked = false;
    closeGroup();

    checkBoxes.forEach(function(checkBoxes) {
        checkBoxes.disabled = true;
    });

    const old_tbody = document.querySelector('tbody');
    const new_tbody = document.createElement('tbody');
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);

    const x = document.querySelector('tbody');

    let sumDay = new Map();

    for (let i = 0; i < myStatementDataSorted.length; i++){
        let amount = myStatementDataSorted[i].amount;
        const date = myStatementDataSorted[i].date;
        const dateString = parseDate(date);

        if(!sumDay.has(dateString)){
            sumDay.set(dateString, amount);
        }
        else{
            const currentAmount = sumDay.get(dateString);
            sumDay.set(dateString, currentAmount + amount);
        }
    }

    let mapIter = sumDay.keys();
    for(let i = 0; i < sumDay.size; i++){
        let currentRow = document.createElement('tr');
        x.appendChild(currentRow);

        let dateFromMap = mapIter.next()
        const dateCell = document.createElement('td');
        dateCell.innerText = dateFromMap.value;
        dateCell.className = "date";
        currentRow.appendChild(dateCell);

        let amountFromMap = sumDay.get(dateFromMap.value);
        fillValues(currentRow, amountFromMap);
    }
}

function fillValues(row, amount){
    if (amount > 0) {
        const incomeCell = document.createElement('td');
        amountString = amount.toLocaleString('ru-RU') + ' ₽';
        incomeCell.innerText = amountString;
        incomeCell.className = "income";
        row.appendChild(incomeCell);
        const outcomeCell = document.createElement('td');
        outcomeCell.className = "outcome";
        row.appendChild(outcomeCell);
    }
    else {
        amount = Math.abs(amount);
        amountString = amount.toLocaleString('ru-RU') + ' ₽';
        row.appendChild(document.createElement('td'));
        const outcomeCell = document.createElement('td');
        outcomeCell.className = "outcome";
        outcomeCell.innerText = amountString;
        row.appendChild(outcomeCell);
    }
}

function closeGroup(){
    x = document.querySelector('tbody');
    const rowsLength = x.rows.length;
    let col = 1;
    let tr, td;
    let header = document.querySelector('#timeHeader');
    if(!timeCB.checked){
        header.style.display="none";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="none";
        }
    }
    else if (timeCB.checked){
        header.style.display="table-cell";            
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="table-cell";
        }
    }
    col = 2;
    header = document.querySelector('#typeHeader');
    if(!typeCB.checked){
        header.style.display="none";
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="none";
        }
    }
    else if (typeCB.checked){
        header.style.display="table-cell";            
        for(i = 0; i < rowsLength; i++){
            tr = x.rows[i];
            td = tr.cells[col];
            td.style.display="table-cell";
        }
    }
}