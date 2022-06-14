const selectBox = document.querySelector(".select-box");
const selectXButton = selectBox.querySelector(".player-x");
const selectOButton = selectBox.querySelector(".player-o");
const playBoard = document.querySelector(".play-board");
const allBox = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const replayBtn = resultBox.querySelector("button");

let playerXIcon = "fas fa-times"; // class name of fontawesome cross icon
let playerOIcon = "fa-regular fa-circle"; // class name of fontawesome circlr icon
let playerSign = "X"; // suppose player will be x
let runBot = true;


// once window loaded
window.onload = () => {
  // add onclick attribute in all avaliable section's spans
  // for(let i = 0; i < allBox.length; i++) {
  //   allBox[i].setAttribute("onclick", "clickedBox(this)");
  // }
  allBox.forEach(box => {
    box.setAttribute("onclick", "clickedBox(this)");
  })

  selectXButton.onclick = () => {
    // hide the select box on playerX button clicked
    selectBox.classList.add("hide");
    // show the playboard section on playerX button clicked
    playBoard.classList.add("show");
  }
  selectOButton.onclick = () => {
    // hide the select box on playerO button clicked
    selectBox.classList.add("hide");
    // show the playboard section on playerO button clicked
    playBoard.classList.add("show");
    // adding three class name in player element
    players.setAttribute("class", "players active player");
  }
}

// user clcik function
function clickedBox(element) { // if players element has contains .player
  // if player will be o then we'll change the sign
  if(players.classList.contains("player")) {
    // adding circle icon tag inside user clicked element
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    players.classList.add("active");
    // if player select O then will change the player value to O
    playerSign = "O";
    element.setAttribute("id", playerSign);
  } else {
    // adding cross icon tag inside user clicked element
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    players.classList.add("active");
    element.setAttribute("id", playerSign);
  }
  // calling the winner function
  selectWinner();
  // once user select then user can't select any other box until box select
  playBoard.style.pointerEvents = "none";
  // once user select any box  then that box can't select again
  element.style.pointerEvents = "none";
  // generating random time delay so bot will delay randomly to select box
  let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
  setTimeout(() => {
    // calling bot function
    bot(runBot);
  }, randomDelayTime);// passing random delay time
}

// bot click function
function bot(runBot) {
  // if runbot is true then run then following codes
  if(runBot) {
    // first change the player sign so if user has x value in id then bot will have O
    playerSign = "O";
    // creating empty array we'll store usselected box index in this array
    let array = [];
    allBox.forEach((box, index) => {
      // if span has no any child element
      if(allBox[index].childElementCount == 0) {
        // inserting unclicked or unselected boxes inside array means that span has no children
        array.push(index);
      }
    });

    // getting random index from array so bot will select random unselected box
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if(array.length > 0) {
      // if players element has contains .player
      if(players.classList.contains("player")) {
        // adding circle icon tag inside user clicked element
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.remove("active");
        // if user is o then the box id value will be x
        playerSign = "X"; 
        allBox[randomBox].setAttribute("id", playerSign);
      } else {
        // adding cross icon tag inside user clicked element
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      // calling the winner function
      selectWinner();
    }
    // once bot select any box then user can't select or click on that box
    allBox[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
    // passing the x value
    playerSign = "X";
  }
}

// let work on select the winner
function getId(idname) {
  // returning id name
  return document.querySelector(".box" + idname).id;
}

function checkId(val1, val2, val3, sign) {
  if(getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
    return true;
  }
}

function selectWinner() {
  // if one combination  of them matched then select the winner
  if(checkId(1,2,3,playerSign) || 
    checkId(4,5,6,playerSign) ||
    checkId(6,7,8,playerSign) ||
    checkId(1,4,7,playerSign) ||
    checkId(2,5,8,playerSign) ||
    checkId(3,6,9,playerSign) ||
    checkId(1,5,9,playerSign) ||
    checkId(3,5,7,playerSign)
    ) {
      // once match won by someone then stop the bot
      runBot = false;
      bot(runBot);
      // we'll delay to show result box
      setTimeout(() => {
        playBoard.classList.remove("show");
        resultBox.classList.add("show");
      }, 700);
      wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    } else {
      // if match has drawn
      // first we'll check all id. if all span has id and no one won the game then we'll draw the game
      if(getId(1) != "" &&
        getId(2) != "" && 
        getId(3) != "" && 
        getId(4) != "" && 
        getId(5) != "" && 
        getId(6) != "" && 
        getId(7) != "" && 
        getId(8) != "" && 
        getId(9) != ""
        ) {
        // once match won by someone then stop the bot
        runBot = false;
        bot(runBot);
        // we'll delay to show result box
        setTimeout(() => {
          playBoard.classList.remove("show");
          resultBox.classList.add("show");
        }, 700);
        wonText.textContent = `Match has been drawn!`;
      }
    }
}

replayBtn.onclick = () => {
  // reload current page
  window.location.reload();
}