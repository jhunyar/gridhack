import { alert } from './constants.js'
import { dungeonLevelEl, inventoryEl, visibleArray, eastCol, westCol, northWall, southWall,
         tileInfoName, tileInfoDesc } from './constants.js'
import { dungeon, player } from './builder.js'

let tileArray = []

const renderFloor =()=> {
  const currentFloor = dungeon.floors[player.currentFloor]

  // Empty the room first
  room.innerHTML = ''

  // Set the floor counter
  dungeonLevelEl.innerHTML = `Level ${player.currentFloor + 1}`

  // Create an element for each tile
  dungeon.floors[player.currentFloor].tiles.forEach(() => {
      const tileEl = document.createElement('div')
      room.appendChild(tileEl)
  })

  // Pick a random tile
  let randTileEl = room.childNodes[Math.floor(Math.random() * currentFloor.tiles.length)]

  // Set that random tile as active
  if (player.currentFloor === 0) {
      randTileEl.id = 'active'
  } else {
      room.childNodes[player.currentTile].id = 'active'
  }

  // Build an array from tile elements
  let tiles = room.getElementsByTagName('div')
  tileArray = Array.from(tiles)

  renderItems()
  // renderMobs()

  // Set the player.currentTile property to the element with the ID of active
  player.currentTile = tileArray.findIndex(x => x.id == 'active')
}

const renderItems =()=> {
  const currentFloor = dungeon.floors[player.currentFloor]
  currentFloor.tiles.filter((tile) => tile.item).forEach((tile) => {
      if (tile.item.type === 'weapon') {
          tileArray[tile.id].innerHTML = '<img src="./assets/images/sword.png" width="70%">'
      } else if (tile.item.type === 'armor') {
          tileArray[tile.id].innerHTML = '<img src="./assets/images/armor.png" width="70%">'
      } else if (tile.item.type === 'potion') {
          tileArray[tile.id].innerHTML = '<img src="./assets/images/potion.png" width="70%">'
      } else if (tile.item.type === 'map') {
          tileArray[tile.id].innerHTML = '<img src="./assets/images/map.png" width="70%">'
      }
  })

  // Mark any staircases with appropriate icons
  if (currentFloor.tiles.filter((tile) => tile.stairDown).length > 0) {
      tileArray[currentFloor.tiles.filter((tile) => tile.stairDown)[0].id].innerHTML = '<i class="fas fa-arrow-down"></i>'
  }

  if (dungeon.floors[player.currentFloor].tiles.filter((tile) => tile.stairUp).length > 0) {
      tileArray[currentFloor.tiles.filter((tile) => tile.stairUp)[0].id].innerHTML = '<i class="fas fa-arrow-up"></i>'
  }
}

const renderMobs =()=> {
  const currentFloor = dungeon.floors[player.currentFloor]
  currentFloor.tiles.forEach((tile) => {
      if (tile.mob) {
          tileArray[tile.id].innerHTML = tile.mob.symbol // '<img src="./assets/images/sword.png" width="70%">'
      } else {
          tileArray[tile.id].innerHTML = ''
          renderTile(tile.id)
      }
  })
}

const renderTile =(id)=> {
  let tile = dungeon.floors[player.currentFloor].tiles[id]

  if (tile.item) {
      if (tile.item.type === 'weapon') {
          tileArray[tile.id].innerHTML = '<img src="./assets/images/sword.png" width="70%">'
      } else if (tile.item.type === 'armor') {
          tileArray[tile.id].innerHTML = '<img src="./assets/images/armor.png" width="70%">'
      } else if (tile.item.type === 'potion') {
          tileArray[tile.id].innerHTML = '<img src="./assets/images/potion.png" width="70%">'
      } else if (tile.item.type === 'map') {
          tileArray[tile.id].innerHTML = '<img src="./assets/images/map.png" width="70%">'
      }
  }

  if (tile.stairDown) {
      tileArray[tile.id].innerHTML = '<i class="fas fa-arrow-down"></i>'
  }

  if (tile.stairUp) {
      tileArray[tile.id].innerHTML = '<i class="fas fa-arrow-up"></i>'
  }
}

const renderCurrentTile =()=> {
  const currentTile = dungeon.floors[player.currentFloor].tiles[player.currentTile]

  if (currentTile.item === null) {
      return
  }

  if (currentTile.item.type === 'weapon') {
      tileArray[currentTile.id].innerHTML = '<img src="./assets/images/sword.png" width="70%">'
  } else if (currentTile.item.type === 'armor') {
      tileArray[currentTile.id].innerHTML = '<img src="./assets/images/armor.png" width="70%">'
  } else if (currentTile.item.type === 'potion') {
      tileArray[currentTile.id].innerHTML = '<img src="./assets/images/potion.png" width="70%">'
  } else if (currentTile.item.type === 'map') {
      tileArray[currentTile.id].innerHTML = '<img src="./assets/images/map.png" width="70%">'
  }

  if (currentTile.stairDown) {
      tileArray[currentTile.id].innerHTML = '<i class="fas fa-arrow-down"></i>'
  }

  if (currentTile.stairUp) {
      tileArray[currentTile.id].innerHTML = '<i class="fas fa-arrow-up"></i>'
  }
}

// Clear the room of anything other than active, mapped and hidden tiles
const resetFloorEls =()=> {
  tileArray.forEach((tile) => {
      if (!dungeon.floors[player.currentFloor].tiles[tileArray.indexOf(tile)].mapped) {
          if (tile.id != 'active'
          && !tile.classList.contains('staircase')
          && !tile.classList.contains('mapped', 'visible')) {
              tile.className = 'hidden'
          }
      } else if (tile.className == 'mapped visible') {
          tile.classList.remove('visible')
      }
  })
}

// Reset the value of the player.currentTile variable
const setActive =()=> {
  player.currentTile = tileArray.findIndex(x => x.id == 'active')
  dungeon.floors[player.currentFloor].tiles[player.currentTile].mapped = true
}

// Set all tiles adjacent to player.currentTile to be visible 
const setVisible =()=> {
  let tileEls = room.getElementsByTagName('div')
  let tiles = dungeon.floors[player.currentFloor].tiles

  visibleArray.forEach((tile) => {
      if (eastCol.includes(player.currentTile + tile) && westCol.includes(player.currentTile) 
      || (westCol.includes(player.currentTile + tile) && eastCol.includes(player.currentTile))
      || northWall.includes(player.currentTile + tile) 
      || southWall.includes(player.currentTile + tile)) {
          return false
      } else {
          tiles[player.currentTile + tile].mapped = true
          tileEls[player.currentTile + tile].classList.remove('hidden')
          tileEls[player.currentTile + tile].classList.add('mapped')
          tileEls[player.currentTile + tile].classList.add('visible')
      }
  })
}

// Clear the alerts
const clearAlerts =()=> {
  alert.innerHTML = ''
}

const describeTile =()=> {
  const room = dungeon.floors[player.currentFloor].tiles[player.currentTile]

  tileInfoName.innerHTML = `${room.name} - Floor type: ${room.floor}`
  tileInfoDesc.innerHTML = `"${room.desc}".`
}

let renderStats =()=> {
  stats.innerHTML = ''
  for (let i = 0; i < Object.keys(player.stats).length; i++) {
      let p = document.createElement('p')
      p.classList.add('stat')
      p.textContent = `${(Object.keys(player.stats)[i]).toUpperCase()}: ${Object.values(player.stats)[i]}`
      stats.appendChild(p)
  }
}

const buildInventory =()=> {
  inventoryEl.innerHTML = ''
  let slotNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'q', 'w', 'e', 'r', 't']
 
  for (let i = 0; i < player.inventory.items.length; i++) {
      let itemEl = document.createElement('div')
      let itemTextEl = document.createElement('p')

      let slotNumber = document.createElement('span')
      slotNumber.style.position = 'relative'
      slotNumber.style.left = '1px'
      slotNumber.style.top = '1px'
      slotNumber.style.color = 'white'
      slotNumber.textContent = slotNumbers[i]

      itemTextEl.textContent = player.inventory.items[i].name
      itemEl.appendChild(itemTextEl)
      itemEl.appendChild(slotNumber)
      inventoryEl.appendChild(itemEl)
  }
}

export { tileArray, renderFloor, renderItems, renderMobs, renderTile, renderCurrentTile,
         resetFloorEls, setActive, setVisible, clearAlerts, describeTile,
         renderStats, renderMobs, buildInventory }