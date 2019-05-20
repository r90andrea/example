let decks = 0;
let shoe = [];

let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let suits  = ['♥', '♦', '♣', '♠'];

let running = 0;
let real = 0;

function updateDecks() {
  decks = $('#decks').prop('disabled', true).val();
  left = decks * 52;
};

function shuffleShoe(decks) {

  while(decks > 0) {
    suits.forEach(suit => {
      values.forEach(value => {

        shoe.push({
          suit: suit,
          value: value
        })
      
      });
    });
    decks--;
  }

  // Shuffle shoe with Fisher-Yates algorithm
  
  let count = shoe.length - 1;

  while(count > 0) {
    index = Math.floor(Math.random() * count);
    [shoe[count], shoe[index]] = [shoe[index], shoe[count]];

    count--;
  }
}

function drawCard() {
  if(decks == 0) {
    updateDecks();
    shuffleShoe(decks);
  }

  if(shoe.length > 0) {

    let card = shoe.pop();

    $('#card').text(card.value);
    $('#suit').text(card.suit);

    if(card.suit == '♥' || card.suit == '♦')
      $('#suit').toggleClass('red');

    updateRunning(card);
  
  } else {
    $('#card').text('End');
    $('#suit').text('');
  }
};

function updateRunning(card) {
  let foo = -1;
  if(card.value < 9) foo = 0;
  if(card.value < 6) foo = +1;

  running = running += foo;

  if($('#round').prop('checked'))
    round = Math.round(shoe.length / 52 * 2) / 2
  else
    round = (shoe.length / 52).toFixed(2);

  real = (running / round).toFixed(2);

  $('#show-running').text(running)
  $('#show-real').text(real)
  $('#show-left').text(left)
}

function testCount() {

  if(shoe.length > 0) {

    ['running', 'real'].forEach(item => {

      let input = $('#' + item).val();

      if(input.length == 0) {
        answer = 'Pick a number..'
      
      } else {

        let user = $('#' + item).val()
        let robot = eval(item)

        if(!Number.isInteger(Number(user)))
          answer = 'Pick an integer number..'

        else if(parseInt(user).toFixed(0) == parseInt(robot).toFixed(0))
          answer = 'Correct! ' + item + ' count is ' + robot;

        else
          answer = 'ERROR! ' + item + ' count is ' + robot;
      }

      $('#' + item).next('span').text(answer)
    })
  }
}

$('#next').bind('touchend', function(e) {
  // prevent double tap zoom in
  e.preventDefault();
  // call the the standard click event
  $(this).click();
}).on('click', function() {
  drawCard();
});

$('#test').bind('touchend', function(e) {
  // prevent double tap zoom in
  e.preventDefault();
  // call the the standard click event
  $(this).click();
}).on('click', function() {
  testCount();
});

$('#show').on('change', function() {
  $('.show-wrapper').toggleClass('hidden');
});
