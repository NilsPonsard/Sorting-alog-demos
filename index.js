"use strict";
let cvBubble = document.getElementById("cv-bubble");
let cxtBubble = cvBubble.getContext('2d');
let cvSelect = document.getElementById("cv-select");
let cxtSelect = cvSelect.getContext('2d');
const width = cvBubble.width;
const height = cvBubble.height;
function randomArray(size) {
    let array = [];
    for (let i = 0; i < size; ++i) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
}
let liste = randomArray(width / 4);
function drawBar(ctx, n, index, state = 1) {
    ctx.fillStyle = "#333333";
    if (state == 2) {
        ctx.fillStyle = "#00FFFF";
    }
    ctx.fillRect(index * 4, height - (n / 100 * height), 4, (n / 100 * height));
}
function swap(array, a, b) {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}
function indiceMinVec(array, deb = 0) {
    let imin = deb;
    let min = array[deb];
    for (let i = deb + 1; i < array.length; ++i) {
        if (min > array[i]) {
            imin = i;
            min = array[i];
        }
    }
    return imin;
}
class selectSort {
    constructor(cv, array) {
        this.array = array;
        this.cv = cv;
        this.ctx = cv.getContext("2d");
        this.finished = false;
        this.i = 0;
    }
    reset(array) {
        this.array = array;
        this.finished = false;
        this.i = 0;
    }
    step() {
        swap(this.array, this.i, indiceMinVec(this.array, this.i));
        this.i += 1;
        if (this.i > this.array.length - 2) {
            this.finished = true;
        }
        for (let i = 0; i < this.array.length; ++i) {
            drawBar(this.ctx, this.array[i], i);
        }
        drawBar(this.ctx, this.array[this.i], this.i, 2);
    }
}
class bubbleSort {
    constructor(cv, array) {
        this.array = array;
        this.cv = cv;
        this.ctx = cv.getContext("2d");
        this.finished = false;
        this.i = array.length - 1;
        this.j = 0;
    }
    reset(array) {
        this.array = array;
        this.finished = false;
        this.i = array.length - 1;
        this.j = 0;
    }
    step() {
        this.j = 0;
        for (; this.j < this.i; ++this.j) {
            if (this.array[this.j] > this.array[this.j + 1]) {
                swap(this.array, this.j, this.j + 1);
            }
        }
        if (this.i < 1) {
            this.finished = true;
        }
        for (let i = 0; i < this.array.length; ++i) {
            drawBar(this.ctx, this.array[i], i);
        }
        drawBar(this.ctx, this.array[this.i], this.i, 2);
    }
}
let select = new selectSort(cvSelect, liste);
let bubble = new bubbleSort(cvBubble, liste);
function launchSelect() {
    cxtSelect.clearRect(0, 0, cvSelect.width, cvSelect.height);
    select.step();
    if (!select.finished) {
        requestAnimationFrame(launchSelect);
    }
}
function launchBubble() {
    cxtBubble.clearRect(0, 0, cvBubble.width, cvBubble.height);
    bubble.step();
    if (!bubble.finished) {
        requestAnimationFrame(launchBubble);
    }
}
function launch() {
    cxtSelect.clearRect(0, 0, cvSelect.width, cvSelect.height);
    cxtBubble.clearRect(0, 0, cvBubble.width, cvBubble.height);
    bubble.step();
    select.step();
    if (!bubble.finished) {
        requestAnimationFrame(launch);
    }
}
function reset() {
    cxtBubble.clearRect(0, 0, cvBubble.width, cvBubble.height);
    cxtSelect.clearRect(0, 0, cvSelect.width, cvSelect.height);
    select.finished = true;
    bubble.finished = true;
    liste = randomArray(liste.length);
    for (let i = 0; i < liste.length; ++i) {
        drawBar(cxtBubble, liste[i], i);
    }
    for (let i = 0; i < liste.length; ++i) {
        drawBar(cxtSelect, liste[i], i);
    }
    select.reset(liste.slice());
    bubble.reset(liste.slice());
}
reset();
