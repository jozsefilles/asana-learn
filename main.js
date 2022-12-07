import {Asana} from "./asana.js";
import {ASANAS_CSV} from "./input-data.js";

function parseInputCsv(inputCsv) {
    const parsed = [];

    let lines = inputCsv.split('\n');
    let buffer = '';
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

        parsed.push(new Asana(...fields));
        buffer = '';
    }

    return parsed;
}

const asanas = parseInputCsv(ASANAS_CSV);

window.showNextAsana = function () {
    let i = Math.floor(Math.random() * asanas.length);
    document.getElementById('index').value = i;
    document.getElementById('reveal-count').value = 0;
    document.getElementById('asana').innerText = asanas[i].asana;
    document.getElementById('translation').innerText = '…';
    document.getElementById('chakra').innerText = '…';
    document.getElementById('energy').innerText = '…';

    document.getElementById('reveal').disabled = false;
    document.getElementById('next').disabled = true;
}

window.revealAsana = function () {
    let i = document.getElementById('index').value;

    let revealCount = document.getElementById('reveal-count');
    switch (+revealCount.value) {
        case 0:
            document.getElementById('translation').innerText = asanas[i].translation;
            ++revealCount.value;
            return;
        case 1:
            document.getElementById('chakra').innerText = asanas[i].chakra;
            ++revealCount.value;
            return;
        case 2:
            document.getElementById('energy').innerText = asanas[i].energy;
    }
    document.getElementById('reveal').disabled = true;
    document.getElementById('next').disabled = false;
}

window.showNextAsana();