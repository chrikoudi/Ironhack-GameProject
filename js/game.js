function SnakesLadders() {
  that = this;
  var winnningPosition = [0,0];
  var numPlayers;
  var counter;

$("#newGame").on("click", function() {
  if(confirm("Are you sure you want to start a new Game?")) {
    that.dice = new Dice();
    that.players = [];
    that.pawns = [];
    numPlayers = 0;
    counter = 0;
    var html = '';
    var modalText;

    $("#newPlayer").on("click", function() {
      if (numPlayers === 4) {

        that._maxPlayers();

      } else {

          if(confirm("You are about to create a new Player. Continue?")) {
            var name = prompt("What's your name?");
            var player = new Player(name);
            html += name + '<br>';
            $('#name').html(html);

            var pawn = new Pawn(numPlayers);

            numPlayers++

            that.players.push(player);
            that.pawns.push(pawn);
            console.log(that.players);
            console.log(that.pawns);
            return that.players;
          }
        }
    });

    $("#rollDice").on("click", function() {
        if ( numPlayers === 0) {

          that._addPlayersFirst();

        } else if ( numPlayers === 1){

          that._onePlayer();

        } else {

            var dice = that.dice.roll();
            modalText = dice.toString();

            that._showDice(counter, modalText);

            var prev = that.pawns[counter].position;
            that.pawns[counter].removePawn(counter, prev);

            that.pawns[counter].position = that.players[counter].nextMove(dice);

            console.log(that.players[counter].position);
            prev = that.pawns[counter].position;

            that.players[counter].position = that.isSnake(that.players[counter].position);
            that.players[counter].position = that.isLadder(that.players[counter].position);

            that.pawns[counter].removePawn(counter, prev);

            that.pawns[counter].position = that.players[counter].position;
            that.pawns[counter].drawPawn(counter);


            console.log(that.players[counter].name + " " + that.players[counter].position);

            that.isFinished(that.players[counter].position, counter);
            console.log(that.isFinished(that.players[counter].position, counter));
            counter++

            if (counter === numPlayers) {
              counter = 0;
            }
          }

        });

}});


  this.snakes = [
    {head: [0,1], tail: [2,1]},
    {head: [0,5], tail: [2,2]},
    {head: [1,1], tail: [4,1]},
    {head: [2,9], tail: [6,6]},
    {head: [4,8], tail: [6,2]},
    {head: [5,6], tail: [6,8]},
    {head: [6,5], tail: [8,2]},
    {head: [7,2], tail: [9,5]},
    {head: [7,8], tail: [8,5]}
  ];
  this.ladders = [
    {top: [0,3], bottom: [1,4]},
    {top: [0,6], bottom: [3,9]},
    {top: [1,3], bottom: [2,3]},
    {top: [3,1], bottom: [6,4]},
    {top: [4,1], bottom: [5,0]},
    {top: [4,5], bottom: [5,5]},
    {top: [6,0], bottom: [7,1]},
    {top: [6,7], bottom: [7,8]},
    {top: [8,2], bottom: [9,1]}
  ];

  this.drawBoard();
  this.drawSnakes();
  this.drawLadders();


this.isLadder = function(position) {

  this.ladders.map(function(ladder, index) {

    if (position.toString() === ladder.bottom.toString()) {
      position = ladder.top;

      $('#ladder_pop').removeClass('hidden');
      $('.modal_background').removeClass('hidden');
      $('#player_modal_text').addClass('hidden');
      $('#dice_modal_name').addClass('hidden');
      $('#snake_pop').addClass('hidden');
      $('#dice_modal_number').addClass('hidden');
      $('#ladder_pop').html("Woohoo, there was a ladder there!");

      var closeModal = function() {
        $('.modal_background').addClass('hidden');
      };
      setTimeout(closeModal, 1600);

      return position;
    }
  })
  return position;
};

this.isSnake = function(position) {

  this.snakes.map(function(snake, index) {
    if (position.toString() === snake.head.toString()) {

      position = snake.tail;

      $('#snake_pop').removeClass('hidden');
      $('.modal_background').removeClass('hidden');
      $('#player_modal_text').addClass('hidden');
      $('#dice_modal_name').addClass('hidden');
      $('#ladder_pop').addClass('hidden');
      $('#dice_modal_number').addClass('hidden');
      $('#snake_pop').html("Oups, there was a snake there...:(");

      var closeModal = function() {
        $('.modal_background').addClass('hidden');
      };
      setTimeout(closeModal, 1600);

      return position;
    }
  })
  return position;
};

this.isFinished = function(position, counter) {
  var res = false;
    if (position.toString() === winnningPosition.toString()) {

      this._winner(this.players[counter].name);
      res = true;
      $("#rollDice").off("click");
      $("#newPlayer").off("click");
      }
    return res;
  };

};


SnakesLadders.prototype.drawBoard = function() {

  var value = 110;
  for (var row = 0; row < 10; row++) {
    if (row % 2 ==- 0) {
      value -=10;
      for (var col = 0; col < 10; col++) {
        $('#board').append($('<div>')
          .addClass('cell')
          .attr('data-row', row)
          .attr('data-col', col)
          .html(value));
          value--;
    }
  } else {
    value -= 9;
    for (var col = 0; col < 10; col++) {
      $('#board').append($('<div>')
        .addClass('cell')
        .attr('data-row', row)
        .attr('data-col', col)
        .html(value));
        value++;
  }
    value -= 1;
  }
    }
  }

SnakesLadders.prototype.drawSnakes = function() {
  this.snakes.forEach(function(element) {
      var selector = '[data-row=' + element.head[0] + ']' +
                     '[data-col=' + element.head[1] + ']';
      $(selector).addClass('snake');
    });
}

SnakesLadders.prototype.drawLadders = function() {
  this.ladders.forEach(function(element) {
      var selector = '[data-row=' + element.bottom[0] + ']' +
                     '[data-col=' + element.bottom[1] + ']';
      $(selector).addClass('ladder');
    });
}

SnakesLadders.prototype._winner = function(name) {

  $('.modal_background').removeClass('hidden');
  $('#player_modal_text').removeClass('hidden');
  $('#dice_modal_name').addClass('hidden');
  $('#dice_modal_number').addClass('hidden');
  $('#snake_pop').addClass('hidden');
  $('#ladder_pop').addClass('hidden');
  $('#player_modal_text').html('\n' + '\n' + name + " won the game!!");

  var closeModal = function() {
    $('.modal_background').addClass('hidden');
  };
  setTimeout(closeModal, 10600);
}

SnakesLadders.prototype._maxPlayers = function() {

  $('.modal_background').removeClass('hidden');
  $('#player_modal_text').removeClass('hidden');
  $('#dice_modal_name').addClass('hidden');
  $('#dice_modal_text').addClass('hidden');
  $('#snake_pop').addClass('hidden');
  $('#ladder_pop').addClass('hidden');
  $('#dice_modal_number').addClass('hidden');
  $('#player_modal_text').html("You have reached the maximum number of Players! The rest of you will have to wait for the next game ;)");

  var closeModal = function() {
    $('.modal_background').addClass('hidden');
  };
  setTimeout(closeModal, 2600);
}

SnakesLadders.prototype._onePlayer = function() {

  $('#dice_modal_text').removeClass('hidden');
  $('.modal_background').removeClass('hidden');
  $('#dice_modal_name').addClass('hidden');
  $('#dice_modal_number').addClass('hidden');
  $('#snake_pop').addClass('hidden');
  $('#ladder_pop').addClass('hidden');
  $('#dice_modal_text').html("Nobody wants to play alone! Get that lonely Player some company!");

  var closeModal = function() {
    $('.modal_background').addClass('hidden');
  };
  setTimeout(closeModal, 2550);
}

SnakesLadders.prototype._addPlayersFirst = function() {
  $('#player_modal_text').addClass('hidden');
  $('#dice_modal_text').removeClass('hidden');
  $('.modal_background').removeClass('hidden');
  $('#snake_pop').addClass('hidden');
  $('#ladder_pop').addClass('hidden');
  $('#dice_modal_name').addClass('hidden');
  $('#dice_modal_number').addClass('hidden');
  $('#dice_modal_text').html("You have to add Players first!");

  var closeModal = function() {
    $('.modal_background').addClass('hidden');
  };
  setTimeout(closeModal, 1600);
}

SnakesLadders.prototype._showDice = function(counter, modalText) {
  $('#player_modal_text').addClass('hidden');
  $('#dice_modal_text').addClass('hidden');
  $('#dice_modal_name').removeClass('hidden');
  $('#dice_modal_number').removeClass('hidden');
  $('.modal_background').removeClass('hidden');
  $('#snake_pop').addClass('hidden');
  $('#ladder_pop').addClass('hidden');
  $('#dice_modal_name').html(that.players[counter].name + ":");
  $('#dice_modal_number').html(modalText);

  var closeModal = function() {
    $('.modal_background').addClass('hidden');
  };
  setTimeout(closeModal, 1600);

}
