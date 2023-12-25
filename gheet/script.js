const initialCellState = {
    fontFamily_data: 'monospace',
    fontSize_data: '14',
    isBold: false,
    isItalic: false,
    textAlign: 'start',
    isUnderlined: false,
    color: '#000000',
    backgroundColor: '#ffffff',
    content: ''
}

let sheetsArray = [];

let activeSheetIndex = -1;

let activeSheetObject = false;

let activeCell = false;


// functionality elments
let fontFamilyBtn = document.querySelector('.font-family');
let fontSizeBtn = document.querySelector('.font-size');
let boldBtn = document.querySelector('.bold');
let italicBtn = document.querySelector('.italic');
let underlineBtn = document.querySelector('.underline');
let leftBtn = document.querySelector('.start');
let centerBtn = document.querySelector('.center');
let rightBtn = document.querySelector('.end');
let colorBtn = document.querySelector('#color');
let bgColorBtn = document.querySelector('#bgcolor');
let addressBar = document.querySelector('.address-bar');
let formula = document.querySelector('.formula-bar');
let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");

// grid header row element
let gridHeader = document.querySelector('.grid-header');

// add header column
let bold = document.createElement('div');
bold.className = 'grid-header-col';
bold.innerText = 'SL. NO.';
gridHeader.append(bold);
for(let i = 65; i<=90; i++){
    let bold = document.createElement('div');
    bold.className = 'grid-header-col';
    bold.innerText = String.fromCharCode(i);
    bold.id = String.fromCharCode(i);
    gridHeader.append(bold);
}

// add all cells
for(let i = 1; i<=100; i++){
    let newRow = document.createElement('div')
    newRow.className = 'row';
    document.querySelector('.grid').append(newRow);

    let bold = document.createElement('div');
    bold.className = 'grid-cell';
    bold.innerText = i;
    bold.id = i;
    newRow.append(bold);

    for(let j = 65; j<=90; j++){
        let cell = document.createElement('div');
        cell.className = 'grid-cell cell-focus';
        cell.id = String.fromCharCode(j) + i;
        cell.contentEditable = true;

        cell.addEventListener('click', (event) => {
            event.stopPropagation();
        })
        cell.addEventListener('focus', cellFocus);
        cell.addEventListener('focusout', cellFocusOut);
        cell.addEventListener('input', cellInput);

        newRow.append(cell);
    }
}

function cellFocus(event){
    let key = event.target.id;
    addressBar.innerHTML = event.target.id;
    activeCell = event.target;

    let activeBg = '#c9c8c8';
    let inactiveBg = '#ecf0f1';

    fontFamilyBtn.value = activeSheetObject[key].fontFamily_data;
    fontSizeBtn.value = activeSheetObject[key].fontSize_data;
    boldBtn.style.backgroundColor = activeSheetObject[key].isBold?activeBg:inactiveBg;
    italicBtn.style.backgroundColor = activeSheetObject[key].isItalic?activeBg:inactiveBg;
    underlineBtn.style.backgroundColor = activeSheetObject[key].isUnderlined?activeBg:inactiveBg;
    setAlignmentBg(key, activeBg, inactiveBg);
    colorBtn.value = activeSheetObject[key].color;
    bgColorBtn.value = activeSheetObject[key].backgroundColor;

    formula.value = activeCell.innerText;

    document.getElementById(event.target.id.slice(0, 1)).classList.add('row-col-focus');
    document.getElementById(event.target.id.slice(1)).classList.add('row-col-focus');
}
function cellInput(){
    let key = activeCell.id;
    formula.value = activeCell.innerText;
    activeSheetObject[key].content = activeCell.innerText;
}
function setAlignmentBg(key, activeBg, inactiveBg){
    leftBtn.style.backgroundColor = inactiveBg;
    centerBtn.style.backgroundColor = inactiveBg;
    rightBtn.style.backgroundColor = inactiveBg;
    if(key){
        document.querySelector('.'+ activeSheetObject[key].textAlign).style.backgroundColor = activeBg;
    }
    else{
        leftBtn.style.backgroundColor = activeBg;
    }
}
function cellFocusOut(event){
    document.getElementById(event.target.id.slice(0, 1)).classList.remove('row-col-focus');
    document.getElementById(event.target.id.slice(1)).classList.remove('row-col-focus');
}






// cell zoom *************//
// let zoomLevel = 100; // Initial zoom level in percentage

// function zoomIn() {
//     zoomLevel += 10;
//     applyZoom();
// }

// function zoomOut() {
//     zoomLevel -= 10;
//     applyZoom();
// }

// function applyZoom() {
//     if (activeCell) {
//         let newSize = (parseInt(activeSheetObject[activeCell.id].fontSize_data) * zoomLevel) / 100;
//         activeSheetObject[activeCell.id].fontSize_data = newSize.toString();
//         activeCell.style.fontSize = newSize + 'px';
//         activeCell.focus();
//     }
// }
// cell zom **************//


// whole sheet **************---->
let zoomLevel = 0;
function zoomIn(){
    if(zoomLevel==10)return;

    zoomLevel++;
    document.querySelectorAll('.grid>*>*').forEach(e => {
        e.style.height = (zoomLevel*3 + 30) + 'px'; 
    })
    document.querySelectorAll('.grid-header-col,.grid-cell').forEach(e => {
        e.style.minWidth = (zoomLevel*10 + 100) + 'px'; 
        e.style.maxWidth = (zoomLevel*10 + 100) + 'px'; 
    })
    document.querySelectorAll('.row>:first-child,.grid-header>:first-child').forEach(e => {
        e.style.minWidth = (zoomLevel*7 + 70) + 'px'; 
    })
}
function zoomOut(){
    if(zoomLevel==-1)return;

    zoomLevel--;
    document.querySelectorAll('.grid>*>*').forEach(e => {
        e.style.height = (zoomLevel*3 + 30) + 'px'; 
    })
    document.querySelectorAll('.grid-header-col,.grid-cell').forEach(e => {
        e.style.minWidth = (zoomLevel*10 + 100) + 'px'; 
        e.style.maxWidth = (zoomLevel*10 + 100) + 'px'; 
    })
    document.querySelectorAll('.row>:first-child,.grid-header>:first-child').forEach(e => {
        e.style.minWidth = (zoomLevel*7 + 70) + 'px'; 
    })
}
// ----------*******whole sheet******>


// ************undo redo***************
// Add these variables at the top of your script.js file
let undoStack = [];
let redoStack = [];

// Add this function to push the current state to the undo stack
function pushToUndoStack() {
    let currentState = JSON.stringify(activeSheetObject);
    undoStack.push(currentState);
}

// Add this function to undo the last action
function undo() {
    if (undoStack.length > 0) {
        let currentState = JSON.stringify(activeSheetObject);
        redoStack.push(currentState);

        let previousState = undoStack.pop();
        activeSheetObject = JSON.parse(previousState);
        changeSheet();
    }
}

// Add this function to redo the last undone action
function redo() {
    if (redoStack.length > 0) {
        let currentState = JSON.stringify(activeSheetObject);
        undoStack.push(currentState);

        let nextState = redoStack.pop();
        activeSheetObject = JSON.parse(nextState);
        changeSheet();
    }
}

// Modify your existing event listeners to call the pushToUndoStack function
// For example, in the cellInput function, add the following line:
function cellInput() {
    let key = activeCell.id;
    formula.value = activeCell.innerText;
    activeSheetObject[key].content = activeCell.innerText;

    // Add this line to push the current state to the undo stack
    pushToUndoStack();

    activeCell.focus();
}

// Modify other relevant event listeners in a similar manner
// (e.g., cellFocus, toggleBold, toggleItalic, toggleUnderline, textColor, backgroundColor, alignment, formula, etc.)
// ************undo redo***************





// ********************find replace********************
const findIp = document.getElementById('findIp');
const repIp = document.getElementById('repIp');
const repBtn = document.getElementById('repBtn');
const found = document.getElementById('found');

// ... (your existing code)

// Add these lines for Find and Replace
function doFind() {
    clearFound();

    const findValue = findIp.value;
    const pattern = new RegExp(findValue, 'g');

    if (!findValue) return;

    let count = 0;
    for (key in activeSheetObject) {
        if (activeSheetObject[key].content.includes(findValue)) {
            document.getElementById(key).classList.add('found');
            count += activeSheetObject[key].content.match(pattern).length;
        }
    }
    found.innerHTML = count;
}

repBtn.addEventListener('click', () => {
    const findValue = findIp.value;
    const repValue = repIp.value;

    document.querySelectorAll('.found').forEach(e => {
        const key = e.id;
        activeSheetObject[key].content = activeSheetObject[key].content.split(findValue).join(repValue);
    })

    changeSheet();
});

function clearFound() {
    document.querySelectorAll('.found').forEach(e => {
        e.classList.remove('found');
    })
    found.innerHTML = 0;
}

// ***************find replace****************888