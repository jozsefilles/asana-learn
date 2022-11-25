import {Asana} from "./asana.js";

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

const asanasCsv = `
Padahastasana;Vorwärtsbeuge im Stehen (Geste oder Hände zu den Füssen);Muladhara;tellurische
Tadasana;Baumposition;-;kosmische
Sahaja Agnisara Dhauti;Natürliche Reinigung mittels der Feueressenz;Manipura;biomagnetische
Trikonasana;Dreieckpose;"Manipura
Chandra (linke Arm)
Surya (rechte Arm)";kosmische + tellurische
Uddiyana Bandha;"Kräftiges Einziehen des Bauches
Pfad des Aufwärtsfliegens";Manipura;biomagnetische
"Garudasana
(Vrkasana)";Adlerpose;"Ajna
";"biomagnetische
kosmische"
Prasarita Padottanasana;Vorwärtsbeuge mit gespreitzten Füssen;"Muladhara
Sahasrara";tellurische
Shalabasana;Grashüpfer Pose;Svadhistana;kosmische
Dhanurasana;Position den Bogens;Manipura;"biomagnetische
tellurische"
Pavana Muktasana;"Windlösende Stellung
Windbefreiende Pose";Manipura;kosmische?
Bhujangasana;Kobrapose;Anahata;kosmische + tellurische
Pascimottanasana;Vorwärtsbeuge im Sitzen/Stellung der hinteren Dehung/Stellung des Aufsteigens nach Westen;Muladhara;tellurische
Cakrasana;Radpose;Dominantes;tellurische
Gomukhasana;Kuhmaulposition;"Anahata - (linke Arm)
Anahata + (rechte Arm)";kosmische
Ardha Matsyendrasana;Halbe Fischgottpose;Visuddha;kosmische
Svastikasana;Glückposition;"Manipura
Ajna";kosmische
Vajrasana;"Diamantensitz
Position des Donnerkeil";"Ajna
Anahata";kosmische
Sarvangasana;"Kerze
Schulterstand";Visuddha;kosmische
Halasana;Pflugpose;Ajna;"tellurische
kosmische"
Sirsasana;Kopfstand;Sahasrara;"kosmische
tellurische"
Janusirsasana;Kopf zum Knie Pose;Muladhara;tellurische
Trikonasana - die Vorwärtsversion;Dreieckpose - die Vorwärtsversion;"Muladhara
Manipura";"kosmische
tellurische"
Marjariasana;Katzen Dehnungs Pose;Manipura;biomagnetische
Shashasana;Hasenpose;"Muladhara
Sahasrara";kosmische
Agnisara Dhauti;Reinigung mit der subtilen Essenz des Feuers;Anahata;biomagnetische
Nauli Kriya;Wellenbewegungsreinigung;Manipura;biomagnetische
`;

const asanas = parseInputCsv(asanasCsv);

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