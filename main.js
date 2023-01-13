import {ASANAS_CSV} from './input-data.js';

const DATA_SETS = {
    Asanas: ASANAS_CSV,
    Vlastnosti: ASANAS_CSV
};

function parseInputCsv(inputCsv) {
    const parsed = [];

    let lines = inputCsv.split('\n');
    const header = lines.shift().split(';');
    let buffer = '';
    for (const line of lines) {
        if (line.trim() === '') {
            continue;
        }

        buffer += line;
        let fields = buffer.split(';');
        if (fields.length < header.length || fields[header.length - 1].lastIndexOf('"') == 0) {
            buffer += ' ';
            continue;
        }
        parsed.push(fields);
        buffer = '';
    }

    return [header, parsed];
}

function initPresenter(header) {
    const presenter = document.getElementById('presenter');
    for (let i = 0; i < header.length; ++i) {
        const label = document.createElement('h3');
        label.innerText = header[i];
        presenter.appendChild(label);

        const field = document.createElement('h2');
        field.setAttribute('id', `field_${i}`);
        presenter.appendChild(field);
    }
}

function loadNextQuest(header, data) {
    let i = Math.floor(Math.random() * data.length);
    document.getElementById('index').value = i;
    document.getElementById('reveal-count').value = 1;
    document.getElementById('field_0').innerText = data[i][0];
    for (let j = 1; j < header.length; ++j) {
        document.getElementById(`field_${j}`).innerText = '…';
    }
    document.getElementById('reveal').disabled = false;
    document.getElementById('next').disabled = true;
}

function revealNextField(header, data) {
    let i = document.getElementById('index').value;
    let revealCount = document.getElementById('reveal-count');
    let j = +revealCount.value;
    document.getElementById(`field_${j}`).innerText = data[i][j];
    if (j >= header.length - 1) {
        document.getElementById('reveal').disabled = true;
        document.getElementById('next').disabled = false;
    } else {
        ++revealCount.value;
    }
}

function loadCsvData(csvData) {
    const [header, data] = parseInputCsv(csvData);
    initPresenter(header);
    loadNextQuest(header, data);

    window.loadNextQuest = () => loadNextQuest(header, data);
    window.revealNextField = () => revealNextField(header, data);
}

loadCsvData(DATA_SETS.Asanas);