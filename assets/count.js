let decks = 0;
let running = 0;
let left = 0;

function updateDecks() {
	decks = $('#decks').prop('disabled', true).val();
	left = decks * 52;
};

function updateRunning(next) {
	if(decks == 0) 
		updateDecks();

	running = running += next;
	$('#running').text(running);
	$('#left').text(--left);

	let round = (left / 52).toFixed(2);
	let real = (running / round).toFixed(2);

	$('#real').text(real);
}

function blink(color) {
  if($('#blink').prop('checked')) {

    let target = $('body').toggleClass('blink-' + color);

    setTimeout(function() {
      target.toggleClass('blink-' + color);
    }, 150);
  }
};

$('#low').bind('touchend', function(e) {
  // prevent double tap zoom in
  e.preventDefault();
  // call the the standard click event
  $(this).click();
}).on('click', function() {
	updateRunning(+1);
  blink('low'); 
});

$('#high').bind('touchend', function(e) {
  // prevent double tap zoom in
  e.preventDefault();
  // call the the standard click event
  $(this).click();
}).on('click', function() {
	updateRunning(-1);
  blink('high'); 
});

$('#mid').bind('touchend', function(e) {
  // prevent double tap zoom in
  e.preventDefault();
  // call the the standard click event
  $(this).click();
}).on('click', function() {
	updateRunning(0);
  blink('mid');  
});
