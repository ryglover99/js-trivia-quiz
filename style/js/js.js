

window.onload = onLoad

const answerDivs = document.querySelectorAll('.ans')
const answerRow = document.querySelectorAll('.ans-row')
var answerRowArray = [...answerRow]
var correctAns;
var counter = 1;
var data;
var score = 0;

function onLoad(){
    getapi()
    displayScore(score)

}



/* retrieves the data from the API and stores it */


async function getapi(){
  
    let response = await fetch('https://opentdb.com/api.php?amount=50&type=multiple'); // fetches data from API and returns a promise

    data = await response.json(); // stores the api data into JSON format
    
    useData(data)
    
   
}
  /* displays the question */

function useData(data){

    let { incorrect_answers, correct_answer } = data.results[counter]
    correctAns = data.results[counter].correct_answer
    allAnswers = [...incorrect_answers, correct_answer]
    populateAnswers(allAnswers)
    document.getElementById("question").innerHTML = `Question ${counter}: ${data.results[counter].question}`
    console.log(data.results[counter])
    document.querySelector("title").innerText = `Trivia Quiz - Question ${counter}`

}



/* Randomly populates the answers section with the correct answer and incorrect answers */

function populateAnswers(allAnswers){
    for (let index = 0; index < answerDivs.length; index++) {
        if (allAnswers === undefined || allAnswers.length == 0){
            console.log("Array does not exist or is empty!")
            break
        } else {
            var randAnswerIndex = Math.floor(Math.random() * allAnswers.length);
            console.log(randAnswerIndex)
            answerDivs[index].innerHTML = allAnswers[randAnswerIndex]
            allAnswers.splice(randAnswerIndex, 1)
            continue
           
        }
        
        
    }

}

/* Clicking the correct answer */
    
    for (let index = 0; index < answerRow.length; index++) {
        
        answerRow[index].addEventListener('click', ()=>{
            
            var i = answerRow[index]
            
            if (answerRow[index].innerText == correctAns){
                console.log("correct")
                counter += 1
                addPointToScore()
                toggleCorrectScoreHighlight()
                displayScore(score)
                toggleGreenAnswer(i)
                setTimeout(useData, 1000, data)
                setTimeout(toggleGreenAnswer, 1000, i)
                setTimeout(toggleCorrectScoreHighlight, 1000)

                
            } else {
                    var foundCorrAnswer = answerRowArray.find(answer => answer.innerText == correctAns) // finds correct answer
                    counter += 1
                    clearScore()
                    displayScore(score)
                    toggleWrongScoreHighlight()
                    toggleRedAnswer(i) // highlights wrong clicked answer red
                    toggleGreenAnswer(foundCorrAnswer) // highlights correct answer green
                    setTimeout(useData, 1000, data) // changes question after 1s
                    setTimeout(toggleRedAnswer, 1000, i) // removes highlight after 1s
                    setTimeout(toggleGreenAnswer, 1000, foundCorrAnswer) // removes highlight after 1s
                    setTimeout(toggleWrongScoreHighlight, 1000)
                    
                   
                    
            } 
           

        });
        
    }
        
function toggleGreenAnswer(i){
    i.classList.toggle("correct_ans")
    
}

function toggleRedAnswer(i){
    i.classList.toggle("incorrect_ans")
}

function displayScore(score){
    document.querySelector('.score-p').innerText = `Score: ${score}`
}

function addPointToScore(){
        score += 50
        
}

function toggleCorrectScoreHighlight(){
    document.querySelector('.score').classList.toggle("score-correct")
}

function toggleWrongScoreHighlight(){
    document.querySelector('.score').classList.toggle("score-wrong")
}

function clearScore(){
    score = 0
}








        
        
   








