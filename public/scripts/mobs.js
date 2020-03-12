import { northWall, eastWall, southWall, westWall } from './constants.js'
import { dungeon, player } from './builder.js'
import { renderTile, renderMob, tileArray, renderStats } from './renderer.js'
import { killPlayer } from './actions.js'

let mobs = []

// [id, name, desc, atk, def, rarity, aggro, symbol, hp, effects ]
mobs[0] = [0, 'rat', 'A small black rat', 1, 0, 30, false, 'r', 1]
mobs[1] = [1, 'large rat', 'A large black rat', 2, 0, 30, false, 'R', 5]
mobs[2] = [2, 'rabid rat', 'A rabid black rat', 3, 0, 90, true, 'ɍ', 3, { poisoned: true }]

function Mob(id, name, desc, atk, def, rarity, aggro, symbol, effects) {
  this.id = id
  this.name = name
  this.desc = desc
  this.atk = atk
  this.def = def
  this.rarity = rarity
  this.aggro = aggro
  this.symbol = symbol
  this.hp = hp
  this.effects = effects
}

const moveMobs = () => {
  let mobTiles = dungeon.floors[player.currentFloor].tiles.filter((tile) => tile.mob)
  let tiles = dungeon.floors[player.currentFloor].tiles

  mobTiles.forEach((tile) => {
    let move = Math.random()*4

    if (move >= 0 && move < 1) { // west
      if (!isBlocked(tile.id, -1)) {
        tile.mob.currentTile = tile.mob.currentTile-1
        tiles[tile.mob.currentTile].mob = JSON.parse(JSON.stringify(tile.mob))
        tiles[tile.mob.currentTile+1].mob = null
        resetTileEl(tile, -1)
      }
    } else if (move >= 1 && move < 2) { // east
      if (!isBlocked(tile.id, 1)) {
        tile.mob.currentTile = tile.mob.currentTile+1
        tiles[tile.mob.currentTile].mob = JSON.parse(JSON.stringify(tile.mob))
        tiles[tile.mob.currentTile-1].mob = null
        resetTileEl(tile, +1)
      }
    } else if (move >= 2 && move < 3) { // north
      if (!isBlocked(tile.id, -14)) {
        tile.mob.currentTile = tile.mob.currentTile-14
        tiles[tile.mob.currentTile].mob = JSON.parse(JSON.stringify(tile.mob))
        tiles[tile.mob.currentTile+14].mob = null
        resetTileEl(tile, -14)
      }
    } else if (move >= 3 && move < 4) { // south
      if (!isBlocked(tile.id, 14)) {
        tile.mob.currentTile = tile.mob.currentTile+14
        tiles[tile.mob.currentTile].mob = JSON.parse(JSON.stringify(tile.mob))
        tiles[tile.mob.currentTile-14].mob = null
        resetTileEl(tile, 14)
      }
    }
  })
}

const isBlocked =(tileId, offset)=> {
  let wall
  let tiles = dungeon.floors[player.currentFloor].tiles

  if (offset === -1) { wall = westWall }
    else if (offset === 1) { wall = eastWall }
    else if (offset === -14) { wall = northWall }
    else if (offset === 14) { wall = southWall }

  if (!tiles[tileId] || wall.includes(tileId+offset) || tiles[tileId+offset].mob != null || player.currentTile === tileId+offset) {
    return true
  }
}

const mobsAttack =()=> {
  let tiles = dungeon.floors[player.currentFloor].tiles
  let dirs = [-1, 1, -14, 14]

  // loop through every possible direction from the player
  for (let i = 0; i < dirs.length; i++) {
    let adjTile = tiles[player.currentTile+dirs[i]]
    // if that tile exists AND there is a mob AND it is aggro...
    if (adjTile && adjTile.mob && adjTile.mob.aggro) {
      console.log('Aggro mob nearby')
      console.log(adjTile.mob)
      attackPlayer(adjTile.mob)
    }
  }
}

const attackPlayer =(mob)=> {
  let playerTotalDef = player.stats.hp + player.stats.def
  
  if (mob.atk > playerTotalDef) {
    killPlayer()
  } else if (mob.atk > player.stats.def) {
    player.stats.hp -= (mob.atk - player.stats.def)
    player.stats.def = 0
    alert.innerHTML = `${mob.name} hits for ${mob.atk}! Armor destroyed. Player health reduced to ${player.stats.hp}`
  } else {
    player.stats.def -= mob.atk
    alert.innerHTML = `${mob.name} hits for ${mob.atk}! Armor absorbed the damage. Armor reduced to ${player.stats.def}`
  }

  renderStats()
}

// Reset a specific tile after a mob movement
const resetTileEl =(tile, offset)=> {
  tileArray[tile.id].innerHTML = ''
  renderMob(tile.id + offset)
  if (tile.item || tile.stairDown || tile.stairUp) {
      renderTile(tile.id)
  }
}

const mobBlocking =(dir)=> dungeon.floors[player.currentFloor].tiles[player.currentTile + dir].mob

export { mobs, moveMobs, mobsAttack, mobBlocking }