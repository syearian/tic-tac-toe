var spaces = [1,2,3,4,5,6,7,8,9];
var availSpaces = spaces;
var cornerCenter = [1,3,5,7,9];
var availCornCent = cornerCenter;
var winCombos = [[1,2,3], [1,4,7], [1,5,9], [2,5,8], [3,5,7], [3,6,9], [4,5,6], [7,8,9]];
var aboutToWin = [[],[]];
var compAboutToWin = [[],[]];
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
          computerTurn();
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

function winnerIs(player) {
  if (player = human) {
    window.alert('You Win!');
  } else if (player = computer) {
    window.alert('Computer Wins!');
  } else {
    window.alert('Draw!');
  }
}

function addMark(player, space) {
  if (player === human) {
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
  if (availCornCent.indexOf(space) !== -1) {    
    index = availCornCent.indexOf(space);
    if (index === 0) {
      availCornCent.shift();
    } else if (index === (availCornCent.length -1)) {
      availCornCent.pop();
    } else {
      var beginArr = availCornCent.slice(0, index);
      var endArr = availCornCent.slice(index + 1);
      availCornCent = beginArr.concat(endArr);
    }
  }
}

function placeMark(target) {
  target.textContent = human.xOrO;
  var space = parseInt(target.id);
  addMark(human, space);
  removeSpace(space);
}

function humanTurn(target) {
  placeMark(target);
  if (win(human)) {
    window.alert('You Win!');
    reset();
  } else if (availSpaces.length === 0) {
    window.alert('Draw!');
    reset();
  } else {
    computerTurn();
  }
}

function alreadyMarked(space) {
  if (human.marks.indexOf(space) !== -1 || computer.marks.indexOf(space) !== -1) {
    return true;
  } else {
    return false;
  }
}

function humanAboutToWin() {
  for (var elem in winCombos) {
    var humanCount = 0;
    var compCount = 0;
    for (var e in winCombos[elem]) {
      if (human.marks.indexOf(winCombos[elem][e]) !== -1) {
        humanCount++
      } else if (computer.marks.indexOf(winCombos[elem][e]) !== -1) {
        compCount++
      }
    }
    if (humanCount === 2 && compCount === 0) {
      aboutToWin[0] = winCombos[elem]; 
      for (var el in winCombos[elem]) {
        if (human.marks.indexOf(winCombos[elem][el]) !== -1) {
          aboutToWin[1].push(winCombos[elem][el]);
        }
      }
      return true;
    }
  }
}

function computerAboutToWin() {
  for (var elem in winCombos) {
    var humanCount = 0;
    var compCount = 0;
    for (var e in winCombos[elem]) {
      if (computer.marks.indexOf(winCombos[elem][e]) !== -1) {
        compCount++
      } else if (human.marks.indexOf(winCombos[elem][e]) !== -1) {
        humanCount++
      }
    }
    if (compCount === 2 && humanCount === 0) {
      compAboutToWin[0] = winCombos[elem]; 
      for (var el in winCombos[elem]) {
        if (computer.marks.indexOf(winCombos[elem][el]) !== -1) {
          compAboutToWin[1].push(winCombos[elem][el]);
        }
      }
      return true;
    }
  }
}

function compChooseSpace() {
  var space;
  humanAboutToWin();
  if (computerAboutToWin()) {
    for (var e in compAboutToWin[0]) {
      if (!(alreadyMarked(compAboutToWin[0][e]))) {
        space = compAboutToWin[0][e];
      }
    }
    addMark(computer, space);
    document.getElementById(space.toString()).textContent = computer.xOrO;
    removeSpace(space);
    aboutToWin = [[],[]];
  } else if (aboutToWin[1].length > 0) {
    for (var e in aboutToWin[0]) {
      if (!(alreadyMarked(aboutToWin[0][e]))) {
        space = aboutToWin[0][e];
      }
    }
    addMark(computer, space);
    document.getElementById(space.toString()).textContent = computer.xOrO;
    removeSpace(space);
    aboutToWin = [[],[]];
  } else if (computer.marks.length < 2) {
    space = availCornCent[Math.floor(Math.random()*availCornCent.length)];
    addMark(computer, space);
    document.getElementById(space.toString()).textContent = computer.xOrO;
    removeSpace(space);
  } else {
    space = availSpaces[Math.floor(Math.random()*availSpaces.length)];
    addMark(computer, space);
    document.getElementById(space.toString()).textContent = computer.xOrO;
    removeSpace(space);
  }
}

function computerTurn() {
  compChooseSpace();
  if (win(computer)) {
    window.alert('Computer Wins!');
    reset();
  } else if (availSpaces.length === 0) {
    window.alert('Draw!');
    reset();
  }
}

function reset() {
  spaces = [1,2,3,4,5,6,7,8,9];
  availSpaces = spaces;
  cornerCenter = [1,3,5,7,9];
  availCornCent = cornerCenter;
  winCombos = [[1,2,3], [1,4,7], [1,5,9], [2,5,8], [3,5,7], [3,6,9], [4,5,6], [7,8,9]];
  aboutToWin = [[],[]];
  compAboutToWin = [[],[]];
  human = {
    xOrO: '',
    marks: []
  }
  computer = {
    xOrO: '',
    marks: []
  }
  var paras = document.getElementsByTagName('p');
  for (var p in paras) {
    paras[p].textContent = '';
  }
  selectxOrO();
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