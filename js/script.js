var spaces = [1,2,3,4,5,6,7,8,9];
var availSpaces = spaces;
var corners = [1,3,7,9];
var availCorners = corners;
var center = 5;
var winCombos = [[1,2,3], [1,4,7], [1,5,9], [2,5,8], [3,5,7], [3,6,9], [4,5,6], [7,8,9]]; 
var human = {
  xOrO: '',
  marks: []
}
var computer = {
  xOrO: '',
  marks: []
}

function selectxOrO() {
  $( function() {
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "X": function() {
          human.xOrO = 'X';
          computer.xOrO = 'O';
          $( this ).dialog( "close" );
        },
        "O": function() {
          human.xOrO = 'O';
          computer.xOrO = 'X';
          $( this ).dialog( "close" );
        }
      }
    });
  } );
}

function win(player) {
  for (var elem in winCombos) {
    var count = 0;
    for (var e in winCombos[elem]) {
      if (player.marks.indexOf(winCombos[elem][e]) !== -1) {
        count++
      }
    }
    if (count === 3) {
      return true;
    }
  }
}

function addMark(player, space) {
  if (player === 'human') {
    human.marks.push(space);
  } else {
    computer.marks.push(space);
  }
}

function removeSpace(space) {
  var index = availSpaces.indexOf(space);
  if (index === 0) {
    availSpaces.shift();
  } else if (index === (availSpaces.length -1)) {
    availSpaces.pop();
  } else {
    var beginArr = availSpaces.slice(0, index);
    var endArr = availSpaces.slice(index + 1);
    availSpaces = beginArr.concat(endArr);
  }
}

function compChooseSpace() {
  if (computer.marks.length === 0) {

  } else {

  }
}

function placeMark(target) {
  target.textContent = human.xOrO;
  var space = parseInt(target.id);
  addMark('human', space);
  removeSpace(space);
}

function computerTurn() {

  if (win()) {

  } else {
    humanTurn();
  }
}

function humanTurn(target) {
  placeMark(target);
  if (win(human)) {
    console.log("You win!");
  } else {
    //computerTurn();
  }
}

function reset() {

}

function ready() {
  var divs = document.querySelectorAll('.center');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener("click", function(event) {
      var target = event.target.firstElementChild;
      humanTurn(target);
    });
  }
  selectxOrO();
}

var everythingLoaded = setInterval(function() {
  if (/loaded|complete/.test(document.readyState)) {
    clearInterval(everythingLoaded);
    ready(); // this is the function that gets called when everything is loaded
  }
}, 10);