function createTableCell(tagName, innerHTML, parent) {
    const cell = document.createElement(tagName)
    cell.innerHTML = innerHTML;
    parent.appendChild(cell);

    return cell;
}

function createHTMLElement(tag, id, parent) {
    const elem = document.createElement(tag);
    elem.id = id;
    parent.appendChild(elem);
}

function createHTMLElementWithParentId(tag, id, parentid) {
    const parent = document.getElementById(parentid);
    if(parentid != undefined) {
        createHTMLElement(tag, id, parent);
    }
}

function renderTableHeader() {
    const tr = document.getElementById('utr');
    const thvalues = [
        {innerHTML: 'Uralkodó'},
        {innerHTML: 'Esemény'},
        {innerHTML: 'Évszám'}
    ];

    for(const value of thvalues) {
        createTableCell('th', value.innerHTML, tr);
    }
}

function renderTable(uralkodok) {
    const tbody = document.getElementById('utbody');
    tbody.innerHTML = '';
    for(const uralkodo of uralkodok) {
        const row = document.createElement('tr');
        tbody.appendChild(row);
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');

        td1.innerHTML = uralkodo.uralkodo_nev;
        td2.innerHTML = uralkodo.esemeny1;
        td3.innerHTML = uralkodo.evszam1;

        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);


        if(uralkodo.esemeny2 && uralkodo.evszam2) {
            td1.rowSpan = 2;
            const row1 = document.createElement('tr');
            tbody.appendChild(row1);

            const td4 = document.createElement('td');
            const td5 = document.createElement('td');

            td4.innerHTML = uralkodo.esemeny2;
            td5.innerHTML = uralkodo.evszam2;

            row1.appendChild(td4);
            row1.appendChild(td5);
        }
    }
}

function generateForm() {
    const form = document.createElement('form');
    form.id = 'form';
    document.body.appendChild(form);
    
    const formvalues = [
        { id: 'uralkodo_nev', label: 'Uralkodó neve:' },
        { id: 'esemeny1', label: 'Első esemény:' },
        { id: 'evszam1', label: 'Első esemény évszáma:' },
        { id: 'esemeny2', label: 'Második esemény:' },
        { id: 'evszam2', label: 'Második esemény évszáma:' },
    ];

    for(const field of formvalues) {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.htmlFor = field.id;
        label.textContent = field.label;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = field.id;
        input.name = field.id;

        const error = document.createElement('div');
        error.className = 'error';

        const br = document.createElement('br');
        const br1 = document.createElement('br');
        const br2 = document.createElement('br');
        const br3 = document.createElement('br');

        div.appendChild(br);
        div.appendChild(label);
        div.appendChild(br1);
        div.appendChild(input);
        div.appendChild(br2);
        div.appendChild(error);
        div.appendChild(br3);
        form.appendChild(div);
    }

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Hozzáadás';
    form.appendChild(button);
}

function validateFields(uralkodo_nev, esemeny1, evszam1, esemeny2, evszam2) {
    let valid = true;
    const errorMessages = form.querySelectorAll('.error');
    for(const error of errorMessages){
        error.innerHTML = "";
    }

    valid = validateElement(uralkodo_nev, 'Kötelező megadni az uralkodó nevét!') && valid;
    valid = validateElement(esemeny1, 'Kötelező megadni az uralkodóhoz tartozó eseményt!') && valid;
    valid = validateElement(evszam1, 'Kötelező megadni az eseményhez tartozó évszámot!') && valid;

    if(evszam2.value === "" && esemeny2.value != ""){
        valid = false;
        const asd = evszam2.parentElement;
        const error = asd.querySelector(`.error`);
        error.innerHTML = `Adj meg az uralkodóhoz egy második évszámot is!`
    }

    if(esemeny2.value === "" && evszam2.value != ""){
        valid = false;
        const asd = esemeny2.parentElement;
        const error = asd.querySelector(`.error`);
        error.innerHTML = `Adj meg az uralkodóhoz egy második eseményt is!`
    }

    return valid;
}

function validateElement(element, errorMessages){
    const error = element.parentElement.querySelector('.error');
    if(element.value === ''){
        error.innerHTML = errorMessages;
        return false;
    }
    else {
        error.innerHTML = "";
        return true;
    }
}

function createHeading() {
    const heading = document.createElement('h2');
    heading.innerText = 'Uralkodó Hozzáadása';
    heading.id = 'form-heading';

    const table = document.getElementById('utable');
    table.after(heading);
}

function clearErrors(){
    const hibak = form.querySelectorAll(`.error`);
    for(const hiba of hibak)
        hiba.innerHTML = ``;
}