/**
 * Created by Vadym Yatsyuk on 27/02/16
 */

class Enemy {
  constructor(level = 1, health = 10, isBoss = false) {
    this.level = level
    this.health = health
    this.isBoss = isBoss
  }

  attack() {
    return this.level * 3 * Math.floor(Math.random() + 2) * (this.isBoss ? 3 : 1)
  }
}

export default Enemy