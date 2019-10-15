let mobs = []

// [id, name, desc, atk, def, rarity]
mobs[0] = [0, 'Rat', 'A small black rat', 1, 0, 30, false]
mobs[1] = [1, 'Large rat', 'A large black rat', 2, 0, 60, false]
mobs[1] = [2, 'Rabid rat', 'A rabid black rat', 3, 0, 90, true]

function Mob(id, name, desc, atk, def, rarity, aggro) {
  this.id = id
  this.name = name
  this.desc = desc
  this.atk = atk
  this.def = def
  this.rarity = rarity
  this.aggro = aggro
}

const moveMobs = () => {
  let mobTiles = dungeon.floors[player.currentFloor].tiles.filter((tile) => tile.mob)
  let tiles = dungeon.floors[player.currentFloor].tiles

  mobTiles.forEach((tile) => {
    let move = Math.random()*4

    if (move >= 0 && move < 1) {
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
    } else if (move >= 1 && move < 2) {
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
    } else if (move >= 2 && move < 3) {
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
    } else if (move >= 3 && move < 4) {
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