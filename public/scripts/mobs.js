let mobs = []

// [id, name, desc, atk, def, rarity]
mobs[0] = [0, 'Rat', 'A small black rat', 1, 0, 20]

function Mob(id, name, desc, atk, def, rarity) {
  this.id = id
  this.name = name
  this.desc = desc
  this.atk = atk
  this.def = def
  this.rarity = rarity
}

const moveMobs = () => {
  let mobTiles = dungeon.floors[player.currentFloor].tiles.filter((tile) => tile.mob)
  let tiles = dungeon.floors[player.currentFloor].tiles

  mobTiles.forEach((tile) => {
    let move = Math.round(Math.random()*4)

    if (move === 0) {
      console.log(`Trying to move mob ${tile.mob.id} west from tile ${tile.mob.currentTile} to ${tile.mob.currentTile-1}`)
      if (!tiles[tile.mob.currentTile-1] 
        || westWall.includes(tile.mob.currentTile-1)
        || tiles[tile.mob.currentTile-1].mob != null) {
        return
      } else {
        tile.mob.currentTile = tile.mob.currentTile-1
        tiles[tile.mob.currentTile].mob = JSON.parse(JSON.stringify(tile.mob))
        tiles[tile.mob.currentTile+1].mob = null
      }
    } else if (move === 1) {
      console.log(`Trying to move mob ${tile.mob.id} east from tile ${tile.mob.currentTile} to ${tile.mob.currentTile+1}`)
      if (!tiles[tile.mob.currentTile+1]
        || eastWall.includes(tile.mob.currentTile+1)
        || tiles[tile.mob.currentTile+1].mob != null) {
        return
      } else {
        tile.mob.currentTile = tile.mob.currentTile+1
        tiles[tile.mob.currentTile].mob = JSON.parse(JSON.stringify(tile.mob))
        tiles[tile.mob.currentTile-1].mob = null
      }
    } else if (move === 2) {
      console.log(`Trying to move mob ${tile.mob.id} north from tile ${tile.mob.currentTile} to ${tile.mob.currentTile-14}`)
      if (!tiles[tile.mob.currentTile-14]
        || northWall.includes(tile.mob.currentTile-14)
        || tiles[tile.mob.currentTile-14].mob != null) {
        return
      } else {
        tile.mob.currentTile = tile.mob.currentTile-14
        tiles[tile.mob.currentTile].mob = JSON.parse(JSON.stringify(tile.mob))
        tiles[tile.mob.currentTile+14].mob = null
      }
    } else {
      console.log(`Trying to move mob ${tile.mob.id} south from tile ${tile.mob.currentTile} to ${tile.mob.currentTile+14}`)
      if (!tiles[tile.mob.currentTile+14]
        || southWall.includes(tile.mob.currentTile+14)
        || tiles[tile.mob.currentTile+14].mob != null) {
        return
      } else {
        tile.mob.currentTile = tile.mob.currentTile+14
        tiles[tile.mob.currentTile].mob = JSON.parse(JSON.stringify(tile.mob))
        tiles[tile.mob.currentTile-14].mob = null
      }
    }
  })
}