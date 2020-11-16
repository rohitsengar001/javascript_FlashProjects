
console.log("Welcome to notes app. This is app.js");
showNotes();//check notes while refresh to the page
actionHeart();//check action heart when refresh page


// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = []; //Intensionally make array [initially this line must be executed while run this program]
  } else {
    notesObj = JSON.parse(notes);//parse??
  }
  //use object literals
  myObj={
    text:addTxt.value,
    title:addTitle.value
  }
  notesObj.push(myObj);//object being include to array
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  //   console.log(notesObj);
  showNotes();
  // actionHeart();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
    // console.log(Array.isArray(notesObj));
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${element.title}<i class="fa fa-heart-o" id="${index}" onclick="fav(this.id)"  aria-hidden="true" ></i></h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
  actionHeart();
}

// Function to delete a note
function deleteNote(index) {
  // console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
  actionHeart();
  localStorage.removeItem(index);
}

//!searching
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

  let inputValC = search.value.toUpperCase();
  let inputValL = search.value.toLowerCase();
  let inputValRel = search.value;
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName('noteCard');
  console.log(noteCards);
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    console.log(cardTxt);
    if (cardTxt.includes(inputValC) || cardTxt.includes(inputValRel) || cardTxt.includes(inputValL)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
    //console.log(cardTxt);
  })
});

// favourite function 
function fav(index) {
  let heart, attrs;

  heart = document.getElementById(index);
  attrs = heart.attributes.item(0).value;
  let indicate = localStorage.getItem(index);
  // console.log(indicate);

  if (indicate == null) {
    heart.attributes.item(0).value = "fa fa-heart";
    localStorage.setItem(index, "yes");
  }
  if (indicate == 'false') {

    localStorage.setItem(index, "yes");
    // console.log("if part execute");


  } else {
    // heart.attributes.item(0).value = "fa fa-heart-o";
    localStorage.setItem(index, "false");
    // console.log("else part execute....");

  }
  actionHeart();

}
function actionHeart() {
  let notes = localStorage.getItem("notes");
  //start check and trace notes
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  //end check and trace notes

  //iterate to noteObj array
  notesObj.forEach(function (element, index) {
    let heart = document.getElementById(index);
    let indicate = localStorage.getItem(String(index)); //get flag from localstorage

    if (indicate == null)
      console.log("nothing to fav");
    else if (indicate == 'false') {
      heart.attributes.item(0).value = "fa fa-heart";

    } else {
      heart.attributes.item(0).value = "fa fa-heart-o";
    }
  });

}

//!play audio while window load
var voice = document.getElementById('myAudio');
// console.log(voice);
addBtn.addEventListener("click", function () {
  voice.play();
});
// window.addEventListener("load",function(){
//   voice.play();
// });

//!sort notes accoding to favourite note
let favBtn = document.getElementById("favBtn");
favBtn.addEventListener('click', function () {
  let notes = localStorage.getItem("notes");
  let noteCards = document.getElementsByClassName('noteCard');
  flag = [];

  //get data into array
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  //sorted store Note's index into flag
  notesObj.forEach(function (element, index) {
    //  console.log(localStorage.getItem(index));
    flag[index] = localStorage.getItem(index);
    //  console.log(flag);
  })
  flag.forEach(function (element, index) {
    if (element == "false") {
      noteCards[index].style.display = 'block';

    } else {
      noteCards[index].style.display = 'none';
    }
  })
});

/*
 Features:
1. Add Title
2.add notes 
3.Mark a note as Important 
4. Sync and host to web server
*/