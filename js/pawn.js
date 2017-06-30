function Pawn(numPlayers) {
  this.position = [9,0],

  this.animals = ['monkey', 'tiger', 'croc', 'bear'],

  this.drawPawn = function(player) {
        var selector = '[data-row=' + this.position[0] + ']' +
                       '[data-col=' + this.position[1] + ']';
        $(selector).addClass(this.animals[player]);
  
}

  this.removePawn = function(player, prev) {
    var selector = '[data-row=' + prev[0] + ']' +
                   '[data-col=' + prev[1] + ']';
    $(selector).removeClass(this.animals[player]);
  }

  this.drawPawn(numPlayers);

};
