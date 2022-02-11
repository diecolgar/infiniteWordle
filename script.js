const body = document.querySelector('body')
const infoButton = document.querySelector('.info')
const infoDisplay = document.querySelector('.infodisplay')

const gridElement = document.querySelectorAll('.grid-element')
const gridKey = document.querySelectorAll('.grid-key')
const winStreak = document.querySelector('.winnumber')

const displayable = document.querySelector('.displayable')

let allWords

const rowLength = 5;
let writtenElements = 0
let currentWins = 0
let currentRow = 1
const gridKeyLength = gridKey.length

let hiddenWord
let hiddenWordArray
let sampleword = '     '
let checkingWordArray =  sampleword.split('')

// function GET RANDOM WORD
function getRandWord() {
    fetch('palabras.txt')
    .then(response => response.text())
    .then((response) => {
        allWords = response.split('\n')
            function random_item(item) {
                return item[Math.floor(Math.random()*item.length)];
            }
        hiddenWord = random_item(allWords);
        hiddenWordArray = hiddenWord.split('')
    })
    .catch(err => console.log(err))
}
getRandWord()

// function RESTART GAME
function restartGame() {
    getRandWord()
    writtenElements = 0
    currentRow = 1
    winStreak.innerHTML = `${currentWins}`
    displayable.classList.remove('justlost')
    displayable.classList.remove('justwon')
    gridElement.forEach( gridElement => {
        gridElement.innerHTML = ''
        gridElement.style.backgroundColor = 'rgb(238, 238, 238)'
        gridElement.style.borderColor = 'rgb(218, 218, 218)'
        gridElement.classList.remove('active')
    })
    gridKey.forEach( gridKey => {
        gridKey.style.backgroundColor = 'rgb(228, 228, 228)'
    })
}

// background-color: ;
// border: solid 2px ;

// function ERASE
function erase(gridKey) {

    if( writtenElements > 0 ) {
        writtenElements--
    }

    // Writting only once in next available space
    gridElement[writtenElements].innerHTML = ''
    gridElement[writtenElements].classList.remove('active')
    gridElement[writtenElements].style.borderColor = 'rgb(218, 218, 218)'
}

// function CHECK
function check() {
    
    if ( (writtenElements) == currentRow*rowLength) {
        checkIfWordExists()
    }
}

// function WRITE
function write(gridKey) {

    // Writting only once in next available space
    gridElement[writtenElements].innerHTML = gridKey.innerHTML
    gridElement[writtenElements].style.borderColor = 'black'
    gridElement[writtenElements].classList.add('active')

    if( writtenElements < (gridKeyLength) ) {
        writtenElements++
    }
}

// KEYBOARD clicking event
gridKey.forEach((gridKey, id) => {
    gridKey.addEventListener('click', () => {

        if ( (id == (gridKeyLength - 2)) && ( writtenElements > ((currentRow-1)*rowLength) ) ) {
            // ERASE
            erase(gridKey)
        }
        else if ( id == gridKeyLength - 1) {
            // CHECK
            check()
        }
        else if (!(id == (gridKeyLength - 2)) && ( writtenElements < (currentRow*rowLength) )) {
            // WRITE
            write(gridKey)
        }
    })
})

function compare() {

    let correctCounter = 0;

    for (let i = 0; i < rowLength; i++) {

        checkingWordArray[i] = gridElement[i+((currentRow-2)*rowLength)].innerHTML

        gridElement[i+((currentRow-2)*rowLength)].style.borderColor = 'white'

        // orange & grey words
        for (let j = 0; j < rowLength; j++) {
            if ( hiddenWordArray[j] == checkingWordArray[i]) {
                gridElement[i+((currentRow-2)*rowLength)].style.backgroundColor = '#7eded4'
                gridKey.forEach( gridKey => {
                    if (gridKey.innerHTML == hiddenWordArray[j]) {
                        gridKey.style.backgroundColor = '#7eded4'
                    }
                })
            }
        }
    
        // green words
        if ( hiddenWordArray[i] == checkingWordArray[i]) {
            gridElement[i+((currentRow-2)*rowLength)].style.backgroundColor = '#79c771'
            gridKey.forEach( gridKey => {
                if (gridKey.innerHTML == hiddenWordArray[i]) {
                    gridKey.style.backgroundColor = '#79c771'
                }
            })
            correctCounter++
        }
        
    }
    if ( correctCounter == 5 ) {
        currentWins++
        displayable.classList.add('justwon')
        setTimeout(restartGame, 1000)
    } else if (currentRow == 7) {
        currentWins = 0
        displayable.classList.add('justlost')
        setTimeout(restartGame, 2000)
    }
}

function checkIfWordExists() {
    let existence = false
    let checkedWord = ''
    for (let i = 0; i < rowLength; i++) {
        checkingWordArray[i] = gridElement[i+((currentRow-1)*rowLength)].innerHTML
        checkedWord = checkedWord.concat(checkingWordArray[i]);
    }
    for (let j = 0; j < allWords.length; j++) {
        if (checkedWord == allWords[j]) {
            existence = true
            currentRow++
            compare()
        }
    }
    if (!existence) {
        alert('Esa palabra no existe...')
    }
}

infoButton.addEventListener('click', () => {
    infoDisplay.classList.toggle('active')
})