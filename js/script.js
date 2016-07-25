




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