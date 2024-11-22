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

    return elem;
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
    tbody.innerHTML = "";
    for(const uralkodo of uralkodok) {
        const row = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');

        tbody.appendChild(row);
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);

        td1.innerHTML = uralkodo.uralkodo_nev;
        td2.innerHTML = uralkodo.esemeny1;
        td3.innerHTML = uralkodo.evszam1;

        if(uralkodo.esemeny2 != undefined) {
            td1.rowSpan = 2;
            const row1 = document.createElement('tr');
            tbody.appendChild(row1);

            const td4 = document.createElement('td');
            const td5 = document.createElement('td');

            row1.appendChild(td4);
            row1.appendChild(td5);
            td4.innerHTML = uralkodo.esemeny2;
            td5.innerHTML = uralkodo.evszam2;
        }
    }
}

function formElements(labelinput, labelinner) {
    const form = document.getElementById('form');
    const div = document.createElement('div');
    const label = document.createElement('label');
    label.htmlFor = labelinput;
    label.innerText = labelinner;
    const br = document.createElement('br');
    const input = document.createElement('input');
    input.type = 'text';
    input.id = labelinput;
    input.name = labelinput;
    const br1 = document.createElement('br');
    const br2 = document.createElement('br');

    const error = document.createElement('div');
    error.classList.add('error');

    div.appendChild(label);
    div.appendChild(br);
    div.appendChild(input);
    div.appendChild(br1);
    div.appendChild(error);
    div.appendChild(br2);
    form.appendChild(div);
}

function generateForm() {
    const form = document.createElement('form');
    form.id = 'form';
    document.body.appendChild(form);
    const formvalues = [
        {
            label_for: "uralkodo_nev",
            labelitext: 'Uralkodó neve:',
            input_type: `text`,
            input_id: "uralkodo_nev",
            inputname: "uralkodo_nev",
            divclass: ".error"
        },
        {
            label_for: "esemeny1",
            labelitext: 'Első esemény:',
            input_type: `text`,
            input_id: "esemeny1",
            inputname: "esemeny1",
            divclass: ".error"
        },
        {
            label_for: "evszam1",
            labelitext: 'Első esemény évszáma:',
            input_type: `text`,
            input_id: "evszam1",
            inputname: "evszam1",
            divclass: ".error"
        },
        {
            label_for: "esemeny2",
            labelitext: 'Második esemény:',
            input_type: `text`,
            input_id: "esemeny2",
            inputname: "esemeny2",
            divclass: ".error"
        },
        {
            label_for: "evszam2",
            labelitext: 'Második esemény évszáma:',
            input_type: `text`,
            input_id: "evszam2",
            inputname: "evszam2",
            divclass: ".error"
        },
    ];

    for(const formvalue of formvalues) {
        formElements(formvalue.label_for, formvalue.labelitext);
    }

    const button = document.createElement('button');
    button.innerText = 'Hozzáadás';
    button.type = 'submit';
    form.appendChild(button);
}

function validateFields(uralkodo_nev, esemeny1, evszam1, esemeny2, evszam2) {
    let valid = true;
    const errorMessages = form.querySelectorAll('.error');
    for(const error of errorMessages){
        error.innerHTML = "";
    }

    valid = validateElement(uralkodo_nev, 'Kötelező megadni az uralkodó nevét!');
    valid = validateElement(esemeny1, 'Kötelező megadni az uralkodóhoz tartozó eseményt!');
    valid = validateElement(evszam1, 'Kötelező megadni az eseményhez tartozó évszámot!');

    if(evszam2.value === "" && esemeny2.value !== ""){
        valid = false;
        const asd = evszam2.parentElement;
        const error = asd.querySelector(`.error`);
        error.innerHTML = `Adj meg az uralkodóhoz egy második évszámot is!`
    }

    if(esemeny2.value === "" && evszam2.value !== ""){
        valid = false;
        const asd = esemeny2.parentElement;
        const error = asd.querySelector(`.error`);
        error.innerHTML = `Adj meg az uralkodóhoz egy második eseményt is!`
    }
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

function createTableStructure() {
    const table = createHTMLElement('table', 'utable', document.body);

    createHTMLElementWithParentId('colgroup', 'ucolg', 'utable');
    createHTMLElementWithParentId('col', 'ucol1', 'ucolg');
    createHTMLElementWithParentId('col', 'ucol2', 'ucolg');
    createHTMLElementWithParentId('col', 'ucol3', 'ucolg');
    document.getElementById('ucol1').classList.add('colored-column');
    document.getElementById('ucol3').classList.add('colored-column');

    createHTMLElementWithParentId('thead', 'uthead', 'utable');
    createHTMLElementWithParentId('tr', 'utr', 'uthead');
    renderTableHeader();

    createHTMLElementWithParentId('tbody', 'utbody', 'utable');
}

function createHeading() {
    const heading = document.createElement('h2');
    heading.innerText = 'Uralkodó Hozzáadása';
    heading.id = 'form-heading';

    // Táblázat után helyezzük el
    const table = document.getElementById('utable');
    table.after(heading); // Az 'after' metódus elhelyezi az elem után
}
