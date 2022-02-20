
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

  let first
  let firstScore
  let second
  let secondScore
  let third
  let thirdScore

    scoreboardData.get().then((doc) => {
        first = doc.data().first
        firstScore = doc.data().firstScore
        second = doc.data().second
        secondScore = doc.data().secondScore
        third = doc.data().third
        thirdScore = doc.data().thirdScore

        console.log(first, firstScore, second, secondScore, third, thirdScore)
    });
  
  function updateScoreboard() {

    if (currentWins > firstScore) {
        third = second
        thirdScore = secondScore
        second = first
        secondScore = firstScore
        first = userName
        firstScore = currentWins
    } else if ( currentWins > secondScore) {
        third = second
        thirdScore = secondScore 
        second = userName
        secondScore = currentWins
    } else if ( currentWins > thirdScore) {
        third = userName
        thirdScore = currentWins
    }

    db.collection("scoreboard").doc("scoreboard").set({
      first: first,
      firstScore: firstScore,
      second: second,
      secondScore: secondScore,
      third: third,
      thirdScore: thirdScore,
    });

  }
  