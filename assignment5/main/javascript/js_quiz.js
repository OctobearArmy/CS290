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
document.getElementById('button1').addEventListener('click', function() { displayFlashcard('Button 1'); });
document.getElementById('button2').addEventListener('click', function() { displayFlashcard('Button 2'); });
document.getElementById('button3').addEventListener('click', function() { displayFlashcard('Button 3'); });

//------------------------------------------------------------------------------------------
// from here down is just stuff I was messing aroun with. Submit does nothing
let down = document.getElementById("name");
           
let br = document.createElement("br");
function enterName() {
  // console.log("br:", br)      
  let form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "submit.php");
  console.log("form:", form)

  let first = document.createElement("input");
  first.setAttribute("type", "text");
  first.setAttribute("name", "FullName");
  first.setAttribute("placeholder", "First");

  let last = document.createElement("input");
  last.setAttribute("type", "text");
  last.setAttribute("name", "dob");
  last.setAttribute("placeholder", "Last");

  let email = document.createElement("input");
  email.setAttribute("type", "text");
  email.setAttribute("name", "emailID");
  email.setAttribute("placeholder", "E-Mail ID");

  let s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
      
    form.appendChild(first);
      
    form.appendChild(br.cloneNode());
      
    form.appendChild(last);
    form.appendChild(br.cloneNode());
      
    form.appendChild(email);
    form.appendChild(br.cloneNode());
      
    form.appendChild(s);

    document.getElementsByTagName("body")[0]
    .appendChild(form);
  }
