var spaces = [1,2,3,4,5,6,7,8,9];
var availSpaces = spaces;
var corners = [1,3,7,9];
var availCorners = corners;
var center = 5;
var wins = [[1,2,3], [1,4,7], [1,5,9], [2,5,8], [3,5,7], [3,6,9], [4,5,6], [7,8,9]]; 
var human = {
  player: '',
  marks: []
}
var computer = {
  player: '',
  marks: []
}

function selectPlayer() {

}

function win() {

}

function placeMark() {

}

function computerTurn() {

}

function humanTurn() {

}

function reset() {

}

function ready() {
  var buttons = document.querySelectorAll('.button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(event) {
      getCorrectFunction(event.target.id, event.target.innerHTML);
    });
  }
}

var everythingLoaded = setInterval(function() {
  if (/loaded|complete/.test(document.readyState)) {
    clearInterval(everythingLoaded);
    ready(); // this is the function that gets called when everything is loaded
  }
}, 10);