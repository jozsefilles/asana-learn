import {Asana} from "./asana.js";
import {ASANAS_CSV} from "./input-data.js";

function parseInputCsv(inputCsv) {
    const parsed = [];

    let lines = inputCsv.split('\n');
    let buffer = '';
    let header;
    for (const line of lines) {
        if (line.trim() === "") {
            continue;
        }

        buffer += line;
        let fields = buffer.split(';');
        if (fields.length < 4 || fields[3].lastIndexOf('"') == 0) {
            buffer += ' ';
            continue;
        }

        if (header) {
            parsed.push(new Asana(...fields));
        } else {
            header = fields;
        }

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

const [header, asanas] = parseInputCsv(ASANAS_CSV);
initPresenter(header);

window.showNextAsana = function () {
    let i = Math.floor(Math.random() * asanas.length);
    document.getElementById('index').value = i;
    document.getElementById('reveal-count').value = 0;
    document.getElementById('field_0').innerText = asanas[i].asana;
    document.getElementById('field_1').innerText = '…';
    document.getElementById('field_2').innerText = '…';
    document.getElementById('field_3').innerText = '…';

    document.getElementById('reveal').disabled = false;
    document.getElementById('next').disabled = true;
}

window.revealAsana = function () {
    let i = document.getElementById('index').value;

    let revealCount = document.getElementById('reveal-count');
    switch (+revealCount.value) {
        case 0:
            document.getElementById('field_1').innerText = asanas[i].translation;
            ++revealCount.value;
            return;
        case 1:
            document.getElementById('field_2').innerText = asanas[i].chakra;
            ++revealCount.value;
            return;
        case 2:
            document.getElementById('field_3').innerText = asanas[i].energy;
    }
    document.getElementById('reveal').disabled = true;
    document.getElementById('next').disabled = false;
}

window.showNextAsana();