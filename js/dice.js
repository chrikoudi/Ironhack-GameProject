function Dice() {
  this.values = [1, 2, 3, 4, 5, 6],
  this.roll = function(){
    var index = Math.floor(Math.random() * this.values.length);
    return this.values[index];
  }
};
