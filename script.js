const body = document.querySelector('body')

const infoButton = document.querySelector('.info')
const infoDisplay = document.querySelector('.infodisplay')
const title = document.querySelector('.title')
const leaderboardDisplay = document.querySelector('.leaderboarddisplay')
const leaderboardButton = document.querySelector('.icon-leaderboard')
const darkmode = document.querySelector('.darkmode')
root = document.documentElement

const gridElement = document.querySelectorAll('.grid-element')
const gridKey = document.querySelectorAll('.grid-key')
const winStreak = document.querySelector('.winnumber')

const displayable = document.querySelector('.displayable')
const closeIcon = document.querySelector('.closeicon')
const closeIconInfo = document.querySelector('.closeiconinfo')

const userNameScreen = document.querySelector('.usernamescreen')
const userNameContent = document.querySelector('.usernamecontent')
const userNameButton = document.querySelector('.icon-tabler-arrow-right')
const userNameClose = document.querySelector('.icon-tabler-x')

let allWords
let reducedWords
let userName = 'Anónimo'

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
    fetch('testeo.txt')
    .then(response => response.text())
    .then((response) => {
        reducedWords = response.split('\n')
            function random_item(item) {
                return item[Math.floor(Math.random()*item.length)];
            }
        hiddenWord = random_item(reducedWords);
        hiddenWordArray = hiddenWord.split('')
    })
    .catch(err => console.log(err))
}
getRandWord()

function getAllWords() {
    fetch('palabras_todas_notilde.txt')
    .then(response => response.text())
    .then((response) => {
        allWords = response.split('\r\n')
    })
    .catch(err => console.log(err))
}
getAllWords()

// function RESTART GAME
function restartGame() {
    getRandWord()
    writtenElements = 0
    currentRow = 1
    winStreak.innerHTML = `RACHA DE VICTORIAS: ${currentWins}`
    displayable.classList.remove('justlost')
    displayable.classList.remove('newrecord')
    gridElement.forEach( gridElement => {
        gridElement.innerHTML = ''
        gridElement.style.backgroundColor = 'var(--lighter)'
        gridElement.style.borderColor = 'var(--light)'
        gridElement.classList.remove('active')
    })
    gridKey.forEach( gridKey => {
        gridKey.style.backgroundColor = 'var(--light)'
    })
}

// function ERASE
function erase(gridKey) {

    if( writtenElements > 0 ) {
        writtenElements--
    }

    // Writting only once in next available space
    gridElement[writtenElements].innerHTML = ''
    gridElement[writtenElements].classList.remove('active')
    gridElement[writtenElements].style.borderColor = 'var(--light)'
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
    gridElement[writtenElements].style.borderColor = 'var(--darker)'
    gridElement[writtenElements].classList.add('active')

    if( writtenElements < (gridKeyLength) ) {
        writtenElements++
    }
}

////////////////////////////////// EVENTS

userNameButton.addEventListener('click', () => {
    userName = document.querySelector('.usernamesubmit').value
    userNameScreen.classList.toggle('active')
})

// KEYBOARD clicking event
gridKey.forEach((gridKey, id) => {
    gridKey.addEventListener('click', () => {

        if ( (gridKey.classList.contains('erasericon')) && ( writtenElements > ((currentRow-1)*rowLength) ) ) {
            // ERASE
            erase(gridKey)
        }
        else if (gridKey.classList.contains('checkericon')) {
            // CHECK
            check()
        }
        else if ( (writtenElements < (currentRow*rowLength) ) && ( !(gridKey.classList.contains('erasericon')) ) ) {
            // WRITE
            write(gridKey)
        }
    })
})

let comparerArray = Array(rowLength)

function compare() {

    let correctCounter = 0;
 
    for (let i = 0; i < rowLength; i++) {

        comparerArray[i] = false

        checkingWordArray[i] = gridElement[i+((currentRow-2)*rowLength)].innerHTML

        // grey words
        gridElement[i+((currentRow-2)*rowLength)].style.borderColor = 'var(--lighter)'
        gridElement[i+((currentRow-2)*rowLength)].style.backgroundColor = 'var(--light)'
        gridKey.forEach( gridKey => {
            if (gridKey.innerHTML == gridElement[i+((currentRow-2)*rowLength)].innerHTML) {
                gridKey.style.backgroundColor = 'var(--dark)'
            }
        })
    }

    for (let i = 0; i < rowLength; i++) {
        // green words
            if ( hiddenWordArray[i] == checkingWordArray[i]) {
                gridElement[i+((currentRow-2)*rowLength)].style.backgroundColor = 'var(--green)'
                gridKey.forEach( gridKey => {
                    if (gridKey.innerHTML == hiddenWordArray[i]) {
                        gridKey.style.backgroundColor = 'var(--green)'
                    }
                })
                comparerArray[i] = true
                correctCounter++
            }
    }
    
    for (let i = 0; i < rowLength; i++) {
        // orange words
        for (let j = 0; j < rowLength; j++) {
            if ( ((hiddenWordArray[j] == checkingWordArray[i]) && (!comparerArray[i])) && !(j == i) ) {
                gridElement[i+((currentRow-2)*rowLength)].style.backgroundColor = 'var(--orange)'
                gridKey.forEach( gridKey => {
                    if (gridKey.innerHTML == hiddenWordArray[j]) {
                        gridKey.style.backgroundColor = 'var(--orange)'
                    }
                })
                comparerArray[j] = true
            }
        }
    }    

    if ( correctCounter == 5 ) {
        currentWins++
        setTimeout(restartGame, 2000)
        updateScoreboard()
    } else if (currentRow == 7) {
        currentWins = 0
            if (!scoreboarded) {
                displayable.classList.add('justlost')
                setTimeout(restartGame, 2000)
            } else {
                displayable.innerHTML = 'NUEVO RÉCORD!'
                displayable.classList.add('newrecord')
                setTimeout(restartGame, 2000)
                setTimeout(() => {
                    leaderboardDisplay.classList.toggle('active')
                    scoreboarded = false
                }, 2000)
            }
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



// DARK MODE TRIGGER
let initialColorSate = false
darkmode.addEventListener('click', () => {

    if(initialColorSate) {
        root.style.setProperty('--dark', 'rgb(220, 220, 220)')
        root.style.setProperty('--light', 'rgb(58, 58, 58)')
        root.style.setProperty('--darker', 'rgb(243, 243, 243)')
        root.style.setProperty('--lighter', 'rgb(31, 31, 31)')
        root.style.setProperty('--orange', 'rgb(209, 173, 10)')
        root.style.setProperty('--green', 'rgb(0, 117, 59)')
        initialColorSate = false
    } else {
        root.style.setProperty('--light', 'rgb(220, 220, 220)')
        root.style.setProperty('--dark', 'rgb(58, 58, 58)')
        root.style.setProperty('--lighter', 'rgb(243, 243, 243)')
        root.style.setProperty('--darker', 'rgb(31, 31, 31)')
        root.style.setProperty('--orange', 'rgb(228, 195, 49)')
        root.style.setProperty('--green', 'rgb(82, 221, 152)')
        initialColorSate = true
    }
})

// INFO TRIGGER
infoButton.addEventListener('click', () => {
    infoDisplay.classList.toggle('active')

    if (!leaderboardDisplay.classList.contains('active')) {
        leaderboardDisplay.classList.toggle('active')
    }
})

closeIconInfo.addEventListener('click', () => {
    infoDisplay.classList.toggle('active')

    if (!leaderboardDisplay.classList.contains('active')) {
        leaderboardDisplay.classList.toggle('active')
    }
})

// TITLE TRIGGER
title.addEventListener('click', () => {
    leaderboardDisplay.classList.add('active')
    infoDisplay.classList.remove('active')
})

// LEADERBOARD TRIGGER
leaderboardButton.addEventListener('click', () => {
    leaderboardDisplay.classList.toggle('active')

    if (infoDisplay.classList.contains('active')) {
        infoDisplay.classList.toggle('active')
    }
})

closeIcon.addEventListener('click', () => {
    leaderboardDisplay.classList.toggle('active')

    if (infoDisplay.classList.contains('active')) {
        infoDisplay.classList.toggle('active')
    }
})