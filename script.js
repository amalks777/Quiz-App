const questions = [
    {
        question: "Which is largest animal in world?", //--> index=0
        answers: [
            {text: "shark", correct: false},
            {text: "elephant", correct: false},
            {text: "blue whale", correct: true},
            {text: "giraffe", correct: false},
        ]
    },
    {
        question: "Which is smallest continent in world?",  //-->index=1
        answers: [
            {text: "asia", correct: false},
            {text: "australia", correct: true},
            {text: "arctic", correct: false},
            {text: "africa", correct: false},
        ]
    }
]
const ques = document.getElementById("question");
const ansbtns = document.getElementsByClassName("ansbtn")[0];
const nxt = document.getElementById("next");

let currentQueInd = 0;
let score = 0;

function startQuiz(){
    currentQueInd = 0;//que no
    score = 0;
    nxt.innerHTML = "Next";
    showQuestion();
    nxt.style.display = "none";
    selectanswer(e);
}
function showQuestion(){
    resetState();// this fn declared in below
    let currentque = questions[currentQueInd]; //question in array[0] will store in currentque
    let queNo = currentQueInd + 1; //show questn no = 0+1 =1
    ques.innerHTML = queNo/*0+1=1*/ + "." + currentque.question/*question inside the array named "currentque*/; 
    
    currentque.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text; // each text in array[answers] will display inside the button
        button.classList.add("btn"); //adding same class & property(btn) to the button
        ansbtns.appendChild(button); //append each button into each ansbtns buttons
        if(answers.correct){
            button.dataset.correct = answers.correct;//it will add true or false in dataset"correct" from array.
        }
        button.addEventListener("click", selectanswer);// declared in below
    })
}

function resetState(){  // this function used to remove first 4 answer buttons. 
    while(ansbtns.firstChild){
        ansbtns.removeChild(ansbtns.firstChild)
    }
}

function selectanswer(e){
   const selectedbtn = e.target;
   const isCorrect = selectedbtn.dataset.correct === "true";
   if(isCorrect){
    selectedbtn.classList.add("correct"); //add same property of (correct) in css to selectedbtn
    score++;
   }else{
    selectedbtn.classList.add("incorrect")
   }

   Array.from(ansbtns.children).forEach(button => {
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
   })

   nxt.style.display = "block";
}

function showScore(){
    resetState();
    ques.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nxt.innerHTML = "play again";
    nxt.style.display = "block";
}

function handleNextButton(){
    currentQueInd++;
    if(currentQueInd < questions.length){
        showQuestion();
    }else{
        showScore();
    }

}

nxt.addEventListener("click", ()=>{
    if(currentQueInd < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();

