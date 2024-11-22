let uralkodok = [
    {
        uralkodo_nev: 'I.István',
        esemeny1: 'Koronázás',
        evszam1: '1000',
        esemeny2: 'Pannonhalmi apátság megalapítása',
        evszam2: '1001'
    },
    {
        uralkodo_nev: 'IV. Béla',
        esemeny1: 'tatárjárás',
        evszam1: '1241-1242'
    },
    {
        uralkodo_nev: 'Mátyás király',
        esemeny1: 'Bécs elfoglalása',
        evszam1: '1485',
        esemeny2: 'Kenyérmezei csata',
        evszam2: '1479'
    },
    {
        uralkodo_nev: 'II. Rákóczi Ferenc',
        esemeny1: 'A szabadságharc kezdete',
        evszam1: '1703',
        esemeny2: 'A szabadságharc vége',
        evszam2: '1711'
    },
]
createTableStructure();
renderTable(uralkodok);
createHeading()
generateForm();

const form = document.getElementById('form');
form.addEventListener('submit', function(e){
    const tbody = document.getElementById('utbody');
    tbody.innerHTML = '';
    e.preventDefault();
    const uralkodo_nev = document.getElementById('uralkodo_nev');
    const esemeny1 = document.getElementById('esemeny1');
    const evszam1 = document.getElementById('evszam1');
    const esemeny2 = document.getElementById('esemeny2');
    const evszam2 = document.getElementById('evszam2');

    const uralkodo_nevvalue = uralkodo_nev.value;
    const esemeny1value = esemeny1.value;
    const evszam1value = evszam1.value;
    let esemeny2value = esemeny2.value;
    let evszam2value = evszam2.value;

    if(esemeny2value === '' && evszam2value === '') {
        esemeny2value = undefined;
        evszam2value = undefined;
    }
    

    if(validateFields(uralkodo_nev, esemeny1, evszam1, esemeny2, evszam2)){
        const uralkodo1 = {
            uralkodo_nev: uralkodo_nevvalue,
            esemeny1: esemeny1value,
            evszam1: evszam1value,
            esemeny2: esemeny2value,
            evszam2: evszam2value,
        };

        uralkodok.push(uralkodo1);
        renderTable(uralkodok);
        form.reset();
    }


})
