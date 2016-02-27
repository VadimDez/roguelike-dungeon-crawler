/**
 * Created by Vadym Yatsyuk on 27/02/16
 */

class Enemy {
  constructor(level = 1, health = 10, damage = 1, isBoss = false) {
    this.level = level
    this.health = health
    this.isBoss = isBoss
    this.damage = damage
  }

  attack() {
    return this.level * this.damage
  }
}

export default Enemy