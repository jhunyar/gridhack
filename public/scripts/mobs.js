let mobs = []

// [id, name, desc, atk, def, rarity]
mobs[0] = [0, 'Rat', 'A small black rat', 1, 0, 10]

function Mob(id, name, desc, atk, def, rarity) {
  this.id = id
  this.name = name
  this.desc = desc
  this.atk = atk
  this.def = def
  this.rarity = rarity
}

const moveMob = (mob) => {
  let move = Math.random()*4

  if (move === 0) {
    mob.currentTile = mob.currentTile-1
  } else if (move === 1) {
    mob.currentTile = mob.currentTile+1
  } else if (move === 2) {
    mob.currentTile = mob.currentTile-14
  } else {a
    mob.currentTile = mob.currentTile+14
  }
}