function Player(name) {
  this.position = [9,0],

  this.name = name, 

  this.nextMove = function(dice) {
    /*even rows*/
    if (this.position[0] % 2 === 0) {
      if (this.position[0] === 0) {
        if (this.position[1] - dice < 0) {
          this.position[1] = dice - 2 * (9 - (9 - this.position[1])) + this.position[1];
        } else {
          this.position[1] = this.position[1] - dice;
        }
      } else {
        if (this.position[1] - dice >= 0) {
          //row = row;
          this.position[1] = this.position[1] - dice;
        } else {
          this.position[0] = this.position[0] - 1;
          this.position[1] = this.position[1] - 2 * (9 - (9 - this.position[1])) + dice -1;
        }
      }
    } /*odd rows*/
    else {
      if (this.position[1] + dice <= 9) {
        //row = row;
        this.position[1] = this.position[1] + dice;
      } else {
        this.position[0] = this.position[0] - 1;
        this.position[1] = this.position[1] + 9 % this.position[1] - (dice - 9 % this.position[1]) + 1;
      }
    }
    return this.position;
  };
};
