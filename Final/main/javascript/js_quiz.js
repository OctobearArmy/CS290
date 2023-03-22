const draggableListItems = document.querySelectorAll(".draggable-list div");

const dropBoxListItems = document.querySelectorAll(".dropBox-list div");

const dropBox1 = document.querySelector(".d1");

const dropBox2 = document.querySelector(".d2");

const dropBox3 = document.querySelector(".d3");

const quiz = document.querySelector(".content")

const endMessage = document.getElementById("endMessage");

const scorebx = document.querySelector(".scorebox")

// current word being dragged (also you"re gonna see a lot of commented out stuff... maybe just pretend I got it right the first time)
let selectedId;

// target id
let dropTargetId;

let matchingCounter = 0;

let numOfQuestions = 3;

let dragSourceElement = null;

let text;

addEventListeners();
//------------------------------------------------------------------------------------------

function dragStart(ev) {
  console.log("Entering 'dragStart'");
  selectedId = this.id;
  text = this.innerHTML;
  console.log("text:",text)
  dragSourceElement = this;
  ev.dataTransfer.effectAllowed = "move";
  ev.dataTransfer.setData("text/html",this.innerHTML)
  console.log("Leaving 'dragStart'");
}
//------------------------------------------------------------------------------------------

function dragEnter(ev) {
  // console.log("Entering "dragEnter"");
  ev.preventDefault();
  targetId = this.id;
  target = document.getElementById(targetId);
  console.log("targetId", targetId)
  console.log("target:",target);
  if (target.innerHTML !== "&nbsp;") {
    this.classList.remove("over");

  }
  else {this.classList.add("over");}
  // let target = document.querySelector(this);
  console.log("Enter() this:", this)
  // this.classList.add("over");
  // 
  // console.log("Leaving "dragEnter"");
}
//------------------------------------------------------------------------------------------

function dragLeave() {
  console.log("Entering 'dragLeave'");
  console.log("Leave() this", this);
  targetId = this.id;
  target = document.getElementById(targetId);
  console.log("targetId", targetId)
  console.log("target:",target);
  console.log("target.innerHTML:",target.innerHTML);
  
  if (target.innerHTML !== "&nbsp;") {
    this.classList.add("over");

  }
  else {this.classList.remove("over");}
  
  
  console.log("Leaving 'dragLeave'");
}
//------------------------------------------------------------------------------------------

function dragOver(ev) {
  // console.log("Entering "dragOver"");
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
  // console.log("Leaving "dragOver"");
}
//------------------------------------------------------------------------------------------

function allowDrop(ev) {
  // console.log("Entering "allowDrop"");
  ev.preventDefault();
  // console.log("Leaving "allowDrop"");
}
//------------------------------------------------------------------------------------------
// makes sure that if the dropzones html are unique
function deleteMatch() {
  dropBoxListItems.forEach (item => {
    if (item.innerHTML === text) {
      item.innerHTML = "&nbsp;"
      item.classList.remove("over")
      item.style.textDecoration = "none";

    }
  })
}
//------------------------------------------------------------------------------------------
// handles the drop events and transfers data
function dragDrop(ev) {
  console.log("Entering 'dragDrop'");
  if (dragSourceElement != this) {
    console.log("Drop() this:", this);
    console.log("Drop() this innerHTML:", this.innerHTML);
    console.log("Drop() ev:", ev);
    let target = this.id;
    console.log("Drop() target: ", target)
    deleteMatch()
  
    }
    // let old = $(this).attr("value");
    // let value = $(dragSourceElement).attr("value");
    console.log("dragSourceElement:", dragSourceElement);
    // console.log(old);
    // console.log(value);
    // // if (dragSourceElement.className !== "fc-event") {
    //   dragSourceElement.innerHTML = this.innerHTML;
    //   $(dragSourceElement).attr("value", old);        
    //   this.innerHTML = ev.dataTransfer.getData("text/html");
    //   $(this).attr("value", value);
    // } else {
    this.innerHTML = ev.dataTransfer.getData("text/html");
    this.style.textDecoration = "underline";
    this.classList.add("over")

    //  $(this).attr("value", value);
    // }
    console.log("this again:", this);
    console.log("this innerHTML:", this.innerHTML);
  }
  //------------------------------------------------------------------------------------------
  // dropTargetId = this.id;
  // ev.preventDefault();
  // const data = ev.dataTransfer.getData("text");
  // ev.target.appendChild(document.getElementById(data));
  // classList.remove("over");

//   console.log("Leaving "dragDrop"");
// }

function submit() {
  console.log("Entering submit");
  console.log("Drop() this innerHTML:", this.innerHTML);

  (checkForMatch())
  let score = document.createTextNode(`Your score was ${matchingCounter}/${numOfQuestions}`)

  scorebx.appendChild(score);
  console.log(`Your score was ${matchingCounter}/${numOfQuestions}`)
  endMessage.style.display = "block";
  console.log("Exiting submit");
  quiz.style.display = "none";

}
//------------------------------------------------------------------------------------------
  // if (checkForMatch(selectedId, dropTargetId)) {

  //   matchingCounter++;
  // }

  // if (matchingCounter === 3) {
  //   endMessage.style.display = "block";
  // }

  function reset() {
    matchingCounter = 0;
   endMessage.style.display = "none";
   dropBoxListItems.forEach (item => {
    item.innerHTML = "&nbsp;"
    item.classList.remove("over")
    })
   quiz.style.display = "grid";

    // window.location.reload()
  }
//------------------------------------------------------------------------------------------
//checks for match
function checkForMatch() {
  if(dropBoxListItems[0].innerHTML === "Dermal Denticles") {
    matchingCounter ++
  }
  if(dropBoxListItems[1].innerHTML === "Ampullae") {
    matchingCounter++
  }
  if(dropBoxListItems[2].innerHTML === "Tapetum Lucidum") {
    matchingCounter++
  }

  return false;   
}
//------------------------------------------------------------------------------------------
//gives an event listener to each drag box for each function.
function addEventListeners() {
  draggableListItems.forEach (item => {
    item.addEventListener("dragstart", dragStart);
  })
  dropBoxListItems.forEach (item => {
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("dragleave", dragLeave);
  })
}
// document.getElementById('button1').addEventListener('click', function() { displayFlashcard('Button 1'); });
// document.getElementById('button2').addEventListener('click', function() { displayFlashcard('Button 2'); });
// document.getElementById('button3').addEventListener('click', function() { displayFlashcard('Button 3'); });

//------------------------------------------------------------------------------------------

$(document).ready(function() {
  var quiz = [];
  var score = 0;

  $.getJSON('/textBox', function(data) {
    quiz = data;
    displayQuestions();
  });

  $('#submit').click(function() {
    var answers = [];
  
    // Add input validation
    var isFormValid = true;
    $('.question').each(function(index) {
      var userAnswer = $(this).find('input').val();
      if (userAnswer.trim() === '') {
        isFormValid = false;
        $(this).find('.suggestions').html('Field required');
      } else {
        answers.push(userAnswer);
        checkSpelling(userAnswer, $(this).find('.suggestions'));
      }
    });
  
    if (!isFormValid) {
      return;
    }
  
    // Send the answers to the server for checking then Calculates and displays the user's score
    $.ajax({
      type: 'POST',
      url: '/checkAnswers',
      contentType: 'application/json',
      data: JSON.stringify({ answers: answers }),
      success: function(data) {
        score = 0;
        displayResults(data);
        $('#score').html('Your score: ' + score + '/' + quiz.length);
        data.forEach(function(result) {
          if (result.isCorrect) {
            score++;
          }
        });
        $('#score').html('Your score: ' + score + '/' + quiz.length);
      }
    });
  });
  

  // Displays the quiz questions on the page
  function displayQuestions() {
    var questionsHTML = '';
    $.each(quiz, function(index, question) {
      questionsHTML += '<div class="question">';
      questionsHTML += '<h3>' + question.question + '</h3>';
      questionsHTML += '<input type="text" class="letters-only">';
      questionsHTML += '<p class="suggestions"></p>';
      questionsHTML += '</div>';
    });
    $('#questions').html(questionsHTML);
    
    // Only allow letters in the input fields
    $('.letters-only').on('input', function() {
      var sanitized = $(this).val().replace(/[^a-zA-Z]/g, '');
      $(this).val(sanitized);
    });
  }

  // Displays the quiz results on the page
  function displayResults(results) {
    let score = 0;
    const output = document.getElementById('results');
  
    output.innerHTML = '';
    results.forEach((result) => {
      const resultString = `${result.question} ${result.userAnswer} - ${result.isCorrect ? 'Correct' : 'Incorrect'} <br>`;
      output.innerHTML += resultString;
      if (result.isCorrect) {
        score++;
      } else if (result.suggestion) {
        const suggestions = result.suggestion;
        console.log('suggestions', suggestions)
        const suggestionString = `Did you mean: ${suggestions.join(', ')}?`;
        const suggestionElement = $(`.question:nth-child(${result.index+1}) .suggestions`);
        suggestionElement.html(suggestionString);
      }
    });
  
    const scoreString = `Score: ${score} out of ${results.length}`;
    output.innerHTML += scoreString;
  }

 // Looks up a word in the dictionary API and returns suggested words if the word is misspelled
function checkSpelling(word, suggestionsElement) {
  if (word.trim() === '') {
    suggestionsElement.html('');
    return;
  }

  const API_KEY = '82221f79-5c2c-46a0-868c-81e55dac7429';
  const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${API_KEY}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (typeof data[0] === 'string') {
        const suggestions = data;
        const suggestionString = `Did you mean: ${suggestions.join(', ')}?`;
        suggestionsElement.html(suggestionString);
      } 
      // else {
      //   const suggestionString = `The input "${word}" is not a word`;
      //   suggestionsElement.html(suggestionString);
      //   // suggestionsElement.html('');
      // }
    })
    .catch(error => {
      console.error(error);
    });
}


});


//------------------------------------------------------------------------------------------
function getConfirmation() {
  var retVal = confirm("Do you want to leave the page?");
  if( retVal == true ) {
    window.location.replace("quiz2.html")
    return true;
  } else {
    alert("Cancel was pressed");
    return false;
  }
}

//------------------------------------------------------------------------------------------

//   $(function() {
//   $('#quiz-form').submit(function(event) {
//     event.preventDefault();
//     const answer = $('input[name="answer"]').val();
//     $.post('/submit', { answer }, function(data) {
//       $('#quiz-result').text(data.result);
//     });
//   });
// });


// const form = document.querySelector('form');

// form.addEventListener('submit', (event) => {
//   const answerInput = document.querySelector('#answer');
//   if (!answerInput.value) {
//     event.preventDefault();
//     alert('Please enter your answer');
//   }
// });
