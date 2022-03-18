let scoreboarded = false

const firstHTML = document.querySelector('.first')
const firstResultHTML = document.querySelector('.firstresult')
const secondHTML = document.querySelector('.second')
const secondResultHTML = document.querySelector('.secondresult')
const thirdHTML = document.querySelector('.third')
const thirdResultHTML = document.querySelector('.thirdresult')
const fourthHTML = document.querySelector('.fourth')
const fourthResultHTML = document.querySelector('.fourthresult')
const fifthHTML = document.querySelector('.fifth')
const fifthResultHTML = document.querySelector('.fifthresult')
const sixthHTML = document.querySelector('.sixth')
const sixthResultHTML = document.querySelector('.sixthresult')
const seventhHTML = document.querySelector('.seventh')
const seventhResultHTML = document.querySelector('.seventhresult')
const eighthHTML = document.querySelector('.eighth')
const eighthResultHTML = document.querySelector('.eighthresult')
const ninthHTML = document.querySelector('.ninth')
const ninthResultHTML = document.querySelector('.ninthresult')
const tenthHTML = document.querySelector('.tenth')
const tenthResultHTML = document.querySelector('.tenthresult')

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcioiZ90kUWLCdGrxnlgPPPYEwP57sN4Q",
    authDomain: "testingenvironment-cb64a.firebaseapp.com",
    projectId: "testingenvironment-cb64a",
    storageBucket: "testingenvironment-cb64a.appspot.com",
    messagingSenderId: "233331720045",
    appId: "1:233331720045:web:839a099701c42cd019e464"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

// Fetching data
const scoreboardData = db.collection('scoreboard').doc('scoreboard')

let playersArray = Array(10)
let scoresArray = Array(10)

  scoreboardData.get().then((doc) => {

    playersArray[0] = doc.data().first
    playersArray[1] = doc.data().second
    playersArray[2] = doc.data().third
    playersArray[3] = doc.data().fourth
    playersArray[4] = doc.data().fifth
    playersArray[5] = doc.data().sixth
    playersArray[6] = doc.data().seventh
    playersArray[7] = doc.data().eighth
    playersArray[8] = doc.data().ninth
    playersArray[9] = doc.data().tenth
    
    scoresArray[0] = doc.data().firstScore
    scoresArray[1] = doc.data().secondScore
    scoresArray[2] = doc.data().thirdScore
    scoresArray[3] = doc.data().fourthScore
    scoresArray[4] = doc.data().fifthScore
    scoresArray[5] = doc.data().sixthScore
    scoresArray[6] = doc.data().seventhScore
    scoresArray[7] = doc.data().eighthScore
    scoresArray[8] = doc.data().ninthScore
    scoresArray[9] = doc.data().tenthScore    

    firstHTML.innerHTML = playersArray[0]
    firstResultHTML.innerHTML = scoresArray[0]
    secondHTML.innerHTML = playersArray[1]
    secondResultHTML.innerHTML = scoresArray[1]
    thirdHTML.innerHTML = playersArray[2]
    thirdResultHTML.innerHTML = scoresArray[2]
    fourthHTML.innerHTML = playersArray[3]
    fourthResultHTML.innerHTML = scoresArray[3]
    fifthHTML.innerHTML = playersArray[4]
    fifthResultHTML.innerHTML = scoresArray[4]
    sixthHTML.innerHTML = playersArray[5]
    sixthResultHTML.innerHTML = scoresArray[5]
    seventhHTML.innerHTML = playersArray[6]
    seventhResultHTML.innerHTML = scoresArray[6]
    eighthHTML.innerHTML = playersArray[7]
    eighthResultHTML.innerHTML = scoresArray[7]
    ninthHTML.innerHTML = playersArray[8]
    ninthResultHTML.innerHTML = scoresArray[8]
    tenthHTML.innerHTML = playersArray[9]
    tenthResultHTML.innerHTML = scoresArray[9]

      for (i = 0; i < 10; i++) {
        console.log(playersArray[i])
        console.log(scoresArray[i])
      }
  });

  function updateScoreboard() {

    for (let i = 0; i < 10; i++) {
      if (currentWins > scoresArray[i]) {
        for (let j = 0; j < 10; j++) {
            if (userName == playersArray[j]) {
                if (currentWins >= scoresArray[j]) {
                    playersArray.splice(j, 1);
                    scoresArray.splice(j, 1);
                    scoreboarded = true;
                    scoresArray.splice(i, 0, currentWins);
                    playersArray.splice(i, 0, userName);
                    break
                } else {
                    console.log("do nothing");
                    break
                }
            }
        }
        scoreboarded = true;
        scoresArray.splice(i, 0, currentWins);
        playersArray.splice(i, 0, userName);
        break
      }
  
      console.log(playersArray[i])
    }

  db.collection("scoreboard").doc("scoreboard").set({
    first: playersArray[0],
    firstScore: scoresArray[0],
    second: playersArray[1],
    secondScore: scoresArray[1],
    third: playersArray[2],
    thirdScore: scoresArray[2],
    fourth: playersArray[3],
    fourthScore: scoresArray[3],
    fifth: playersArray[4],
    fifthScore: scoresArray[4],
    sixth: playersArray[5],
    sixthScore: scoresArray[5],
    seventh: playersArray[6],
    seventhScore: scoresArray[6],
    eighth: playersArray[7],
    eighthScore: scoresArray[7],
    ninth: playersArray[8],
    ninthScore: scoresArray[8],
    tenth: playersArray[9],
    tenthScore: scoresArray[9],
  });

  firstHTML.innerHTML = playersArray[0]
  firstResultHTML.innerHTML = scoresArray[0]
  secondHTML.innerHTML = playersArray[1]
  secondResultHTML.innerHTML = scoresArray[1]
  thirdHTML.innerHTML = playersArray[2]
  thirdResultHTML.innerHTML = scoresArray[2]
  fourthHTML.innerHTML = playersArray[3]
  fourthResultHTML.innerHTML = scoresArray[3]
  fifthHTML.innerHTML = playersArray[4]
  fifthResultHTML.innerHTML = scoresArray[4]
  sixthHTML.innerHTML = playersArray[5]
  sixthResultHTML.innerHTML = scoresArray[5]
  seventhHTML.innerHTML = playersArray[6]
  seventhResultHTML.innerHTML = scoresArray[6]
  eighthHTML.innerHTML = playersArray[7]
  eighthResultHTML.innerHTML = scoresArray[7]
  ninthHTML.innerHTML = playersArray[8]
  ninthResultHTML.innerHTML = scoresArray[8]
  tenthHTML.innerHTML = playersArray[9]
  tenthResultHTML.innerHTML = scoresArray[9]

}
  
