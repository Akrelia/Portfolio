class Dot {
    constructor(speed) {
      this.x = 0;
      this.y = 0;
      this.speed = speed;
      this.velocityX = 0;
      this.velocityY = 0;
    }
  
    setRandomPosition(width, height) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }
  
    setRandomDirection() {
      this.velocityX = Math.round(Math.random()) * 2 - 1;
      this.velocityY = Math.round(Math.random()) * 2 - 1;
    }
  
    update(width, height) {
      this.x += this.velocityX * this.speed;
      this.y += this.velocityY * this.speed;
  
      if (this.x <= 0 || this.x >= width) {
        this.velocityX *= -1;
      }
  
      if (this.y <= 0 || this.y >= height) {
        this.velocityY *= -1;
      }
    }
  
    getDistance(otherDot) {
      let deltaY = this.y - otherDot.y;
      let deltaX = this.x - otherDot.x;
  
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
  
    getDistancePos(posX, posY) {
      let deltaY = this.y - posY;
      let deltaX = this.x - posX;
  
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
  }