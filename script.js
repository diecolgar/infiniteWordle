const gridElement = document.querySelectorAll('.grid-element')
const gridKey = document.querySelectorAll('.grid-key')
const winStreak = document.querySelector('.winstreak')

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
    fetch('0_palabras_todas_test.txt')
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
    writtenElements = 0
    currentRow = 1
    gridElement.forEach( gridElement => {
        gridElement.innerHTML = ''
        gridElement.style.backgroundColor = 'rgb(238, 238, 238)'
        gridElement.style.borderColor = 'rgb(218, 218, 218)'
        gridElement.classList.remove('active')
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
        currentRow++
        compare()
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
            }
        }
    
        // green words
        if ( hiddenWordArray[i] == checkingWordArray[i]) {
            gridElement[i+((currentRow-2)*rowLength)].style.backgroundColor = '#79c771'
            correctCounter++
        }
        
    }
    if ( correctCounter == 5 ) {
        currentWins++
        getRandWord()
        winStreak.innerHTML = `VICTORIAS: ${currentWins}`
        setTimeout(restartGame, 5000)
    }
}
