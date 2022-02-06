const gridElement = document.querySelectorAll('.grid-element')
const gridKey = document.querySelectorAll('.grid-key')
const winStreak = document.querySelector('.winstreak')

const rowLength = 5;
let writtenElements = 0
let currentWins = 0
let currentRow = 1
const gridKeyLength = gridKey.length

let hiddenWords = ['COCHE', 'NIEVE', 'NOCHE', 'CUENTA', 'CAMAS']
let hiddenWord = hiddenWords[currentWins]
let sampleword = '     '

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
        // console.log(currentRow*rowLength)

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
            console.log('write')
        }
    })
})

// HIDDEN WORD COMPARISON
let hiddenWordArray = hiddenWord.split('')
let checkingWordArray =  sampleword.split('')

function compare() {

    let correctCounter = 0;

    for (let i = 0; i < rowLength; i++) {

        checkingWordArray[i] = gridElement[i+((currentRow-2)*rowLength)].innerHTML

        gridElement[i+((currentRow-2)*rowLength)].style.borderColor = 'white'

        // orange & grey words
        for (let j = 0; j < rowLength; j++) {
            if ( hiddenWordArray[j] == checkingWordArray[i]) {
                console.log('almost...')
                gridElement[i+((currentRow-2)*rowLength)].style.backgroundColor = '#7eded4'
            }
        }
    
        // green words
        if ( hiddenWordArray[i] == checkingWordArray[i]) {
            console.log('ok!')
            gridElement[i+((currentRow-2)*rowLength)].style.backgroundColor = '#79c771'
            correctCounter++
        }
        
    }
    if ( correctCounter == 5 ) {
        alert('u won!')
        currentWins++
        hiddenWord = hiddenWords[currentWins]
        hiddenWordArray = hiddenWord.split('')
        winStreak.innerHTML = `Winstreak: ${currentWins}`
        console.log(hiddenWord)
        restartGame()
    }
}
