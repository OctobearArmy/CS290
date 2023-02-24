const draggableListItems = document.querySelectorAll('.draggable-list div');

const dropBoxListItems = document.querySelectorAll('.dropBox-list div');

const quiz = document.querySelector('.container')

const endMessage = document.getElementById('endMessage');

const scorebx = document.querySelector('.scorebox')

// current word being dragged (also you're gonna see a lot of commented out stuff... maybe just pretend I got it right the first time)
let selectedId;

// target definition
let dropTargetId;

let boxd1;
let boxd2;
let boxd3;

let boxValId1;
let boxValId2;
let boxValId3;

let boxes = [boxd1,boxd2,boxd3]

// counter for correct phrases
let matchingCounter = 0;

let numOfQuestions = 3;

let dragSourceElement = null;

addEventListeners();

function dragStart(ev) {
  console.log("Entering 'dragStart'");
  selectedId = this.id;
  // let id1;
  // let id2;
  // let id3;
  if ((boxd1 && boxd2 && boxd3) || (selectedId !== (boxValId1 || boxValId2 || boxValId3))) {
    // id1
    // console.log('id1', id1)
    // console.log('id2', id2)
    // console.log('id1', id1)


  }
  // if (boxd2) {
  //   id2 = boxValId2; 
  // }
  // if (boxd3) {
  //   id3 =bo
  // }


  dragSourceElement = this;
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData('text/html',this.innerHTML)
  console.log("Leaving 'dragStart'");
}

function dragEnter(ev) {
  // console.log("Entering 'dragEnter'");
  ev.preventDefault();
  this.classList.add('over');
  // console.log("Leaving 'dragEnter'");
}

function dragLeave() {
  // console.log("Entering 'dragLeave'");
  this.classList.remove('over');
  // console.log("Leaving 'dragLeave'");
}

function dragOver(ev) {
  // console.log("Entering 'dragOver'");
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';
  // console.log("Leaving 'dragOver'");
}

function allowDrop(ev) {
  // console.log("Entering 'allowDrop'");
  ev.preventDefault();
  // console.log("Leaving 'allowDrop'");
}

function dragDrop(ev) {
  console.log("Entering 'dragDrop'");
  if (dragSourceElement != this) {
    console.log("this:", this);
    console.log("this innerHTML:", this.innerHTML);
    console.log("ev:", ev);
    let target = this.id;
    console.log('target: ', target)
    if(target === 'd1') {
      boxd1 = dragSourceElement;
      boxValId1 =selectedId;
      if (selectedId === boxValId1)  {
        let del = document.getElementById('d1') 
        del.innerHTML ='&nbsp;'
        del.classList.remove('over')

      }
      if (selectedId === boxValId2)  {
        let del = document.getElementById('d2') 
        del.innerHTML ='&nbsp;' 
        del.classList.remove('over')
     
      }
      if (selectedId === boxValId3)  {
        let del = document.getElementById('d3') 
        del.innerHTML ='&nbsp;'
        del.classList.remove('over')
      }     
      console.log(' boxd1: ', boxd1)
      console.log(' boxd2: ', boxd2)
      console.log(' boxd3: ', boxd3)

    }
    if (target === 'd2') {
      boxd2 = dragSourceElement;
      boxValId2 =selectedId;
      if (selectedId === boxValId1)  {
        let del = document.getElementById('d1') 
        del.innerHTML ='&nbsp;'
        del.classList.remove('over')

      }
      if (selectedId === boxValId2)  {
        let del = document.getElementById('d2') 
        del.innerHTML ='&nbsp;' 
        del.classList.remove('over')
     
      }
      if (selectedId === boxValId3)  {
        let del = document.getElementById('d3') 
        del.innerHTML ='&nbsp;'
        del.classList.remove('over')
      }
      console.log(' boxd1: ', boxd1)
      console.log(' boxd2: ', boxd2)
      console.log(' boxd3: ', boxd3)

    }
    if (target === 'd3') {
      boxd3 = dragSourceElement;
      boxValId3 =selectedId;
      if (selectedId === boxValId1)  {
        let del = document.getElementById('d1') 
        del.innerHTML ='&nbsp;'
        del.classList.remove('over')

      }
      if (selectedId === boxValId2)  {
        let del = document.getElementById('d2') 
        del.innerHTML ='&nbsp;' 
        del.classList.remove('over')
     
      }
      if (selectedId === boxValId3)  {
        let del = document.getElementById('d3') 
        del.innerHTML ='&nbsp;'
        del.classList.remove('over')
      }
      console.log(' boxd1: ', boxd1)
      console.log(' boxd2: ', boxd2)
      console.log(' boxd3: ', boxd3)
    }
    // let old = $(this).attr('value');
    // let value = $(dragSourceElement).attr('value');
    console.log("dragSourceElement:", dragSourceElement);
    // console.log(old);
    // console.log(value);
    // // if (dragSourceElement.className !== "fc-event") {
    //   dragSourceElement.innerHTML = this.innerHTML;
    //   $(dragSourceElement).attr("value", old);        
    //   this.innerHTML = ev.dataTransfer.getData('text/html');
    //   $(this).attr("value", value);
    // } else {
    this.innerHTML = ev.dataTransfer.getData('text/html');
    //  $(this).attr("value", value);
    // }
    console.log("this again:", this);
    console.log("this innerHTML:", this.innerHTML);
  }
  // dropTargetId = this.id;
  // ev.preventDefault();
  // const data = ev.dataTransfer.getData("text");
  // ev.target.appendChild(document.getElementById(data));
  // classList.remove('over');
  this.classList.add('over')

  console.log("Leaving 'dragDrop'");
}

function submit() {
  console.log("Entering submit");
  let arr = [document.getElementById('d1'), document.getElementById('d2'), document.getElementById('d3')];
  arr.forEach(function(a){
    console.log("a:", a);
    let drop = a.id;
    console.log('submit boxd1: ', boxd1)
    console.log('submit boxd2: ', boxd2)
    console.log('submit boxd3: ', boxd3)


    // console.log('submit boxd1.id: ', boxd1.id)
    // console.log('boxd2.id',boxd2.id)
    // console.log('boxd3.id',boxd3.id)


    console.log("drop:", drop);

    // let val = $(a).find;
    // console.log("val:", val);

    // let valId = val.id;
    // console.log("a:", a);
    // console.log("val:", val);
    // console.log("drop:", drop);
    // let item = this.value.id;
    if (checkForMatch(drop)) {
      console.log("checkForMatch",checkForMatch());

        matchingCounter++;
        console.log("Matchingcounter", matchingCounter);

      }

  })
  let score = document.createTextNode(`Your score was ${matchingCounter}/${numOfQuestions}`)

  scorebx.appendChild(score);
  console.log(`Your score was ${matchingCounter}/${numOfQuestions}`)
  endMessage.style.display = 'block';
  console.log("Exiting submit");
  quiz.style.display = "none";

}

  // if (checkForMatch(selectedId, dropTargetId)) {

  //   matchingCounter++;
  // }

  // if (matchingCounter === 3) {
  //   endMessage.style.display = 'block';
  // }

  //this.cl
  function reset() {
    window.location.reload()
  }

function checkForMatch( drop) {
  console.log("Entering checkForMatch");
  console.log("Matchingcounter", matchingCounter);

  console.log("boxws", boxes);

  let id1;
  let id2;
  let id3;
  if (boxd1) {
    id1 = boxd1.id
    console.log('boxd1.id',boxd1.id)
  }
  if (boxd2) {
    id2 = boxd2.id
    console.log('boxd2.id',boxd2.id)
  }
  if (boxd3) {
    id3 = boxd3.id
    console.log('boxd3.id',boxd3.id)
  }

  if (drop === 'd1' && id1 === 'a1') { return true;}

  if (drop === 'd2' && id2 === 'a2') { return true;}

  if (drop === 'd3' && id3 === 'a3') { return true;}
  console.log("Exiting checkForMatch");

  return false;   
}

// function checkAnswer(selected, dropTarget) {
//   switch (selected) {
//     case 'a1':
//       return dropTarget === 'd1' ? true : false;
    
//     case 'a1':
//       return dropTarget === 'd2' ? true : false;
    
//     case 'a1':
//       return dropTarget === 'd3' ? true : false;

//     case 'a2':
//       return dropTarget === 'd1' ? true : false;

//     case 'a2':
//       return dropTarget === 'd2' ? true : false;

//     case 'a2':
//       return dropTarget === 'd3' ? true : false;

//     case 'a3':
//       return dropTarget === 'd1' ? true : false;

//     case 'a3':
//       return dropTarget === 'd2' ? true : false;

//     case 'a3':
//       return dropTarget === 'd3' ? true : false;


//     default:
//       return false;
//   }
// }


// function playAgain() {
//   matchingCounter = 0;
//   endMessage.style.display = 'none';
//   draggableListItems.forEach(item => {
//     document.getElementById(item.id).style.display = 'block';
//   })
//   droppableListItems.forEach(item => {
//     document.getElementById(item.id).style.display = 'block';
//   })
// }
// function playAgain() {
//   matchingCounter = 0;
//   endMessage.style.display = 'none';
//   draggableListItems.forEach(item => {
//     document.getElementById(item.id).style.display = 'block';
//   })
//   droppableListItems.forEach(item => {
//     document.getElementById(item.id).style.display = 'block';
//   })
// }

function addEventListeners() {
  draggableListItems.forEach (item => {
    item.addEventListener('dragstart', dragStart);
  })
  dropBoxListItems.forEach (item => {
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragleave', dragLeave);
  })
}

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