import { alert, northWall, eastWall, southWall, westWall, tileInfoDesc } from './constants.js'
import { dungeon, player } from './builder.js'
import { buildInventory, clearAlerts, describeTile, renderCurrentTile, renderFloor, renderMob,
         renderStats, resetFloorEls, setActive, setVisible, tileArray } from './renderer.js'
import { moveMobs, mobBlocking, mobsAttack } from './mobs.js'
import { soundsAttack } from './sounds.js'
import { startGame } from './main.js'

const playerActionEvents =()=> {
    // main movement and action listener
    document.addEventListener('keydown', function(e) {
        const current = tileArray[player.currentTile]
        const nw = tileArray[player.currentTile-29]
        const ne = tileArray[player.currentTile-27]
        const se = tileArray[player.currentTile+29]
        const sw = tileArray[player.currentTile+27]
        const west = tileArray[player.currentTile-1]
        const east = tileArray[player.currentTile+1]
        const north = tileArray[player.currentTile-28]
        const south = tileArray[player.currentTile+28]

        let moveWest, moveNorth, moveEast, moveSouth

        if (player.prefs.controls === 'wasd') {
            moveWest = e.code === 'KeyA'
            moveNorth = e.code === 'KeyW'
            moveEast = e.code === 'KeyD'
            moveSouth = e.code === 'KeyS'
        } else if (player.prefs.controls === 'arrows') {
            moveWest = e.code === 'ArrowLeft'
            moveNorth = e.code === 'ArrowUp'
            moveEast = e.code === 'ArrowRight'
            moveSouth = e.code === 'ArrowDown'
        } else if (player.prefs.controls === 'numpad') {
            moveSouth = e.code === 'Numpad2'
            moveEast = e.code === 'Numpad6'
            moveNorth = e.code === 'Numpad8'
            moveWest = e.code === 'Numpad4'
        }

        let moveNE = e.code === 'Numpad9'
        let moveSE = e.code === 'Numpad3'
        let moveSW = e.code === 'Numpad1'
        let moveNW = e.code === 'Numpad7'
        let moveDown = e.code === 'PageDown'
        let moveUp = e.code === 'PageUp'
        let look = e.code === 'KeyL'
        let get = e.code === 'Period'
        let drop = e.code === 'Comma'
        let use = e.code === 'KeyU'

        let postAttack = false

        if (moveNE || moveNW || moveSE || moveSW || moveWest || moveNorth || moveEast || moveSouth || moveDown || moveUp || look || get || drop || use) {

            // prevent default action of ctrl and shift keys to avoid error
            if (e.ctrlKey) return false
            if (e.shiftKey) return false

            // conditional movement rules to determine which tile we need to set as active and which we need to clear
            if (moveWest) {
                if (westWall.includes(player.currentTile-1)) {
                    alert.innerHTML = ' You can\'t go that way!'
                    setVisible()
                    return false
                } else {
                    if (mobBlocking(-1)) {
                        let soundAttack = new Audio(soundsAttack[Math.floor(Math.random() * 3)])
                        soundAttack.play()
                        attackMob(-1)
                        renderMob(player.currentTile-1)
                        postAttack = true
                    } else {
                        mobsAttack()
                        current.id = ''
                        west.id = 'active'
                        player.currentTile = player.currentTile-1
                    }
                }
            } else if (moveNW) {
                if (northWall.includes(player.currentTile-29) || westWall.includes(player.currentTile-29)) {
                    alert.innerHTML = ' You can\'t go that way!'
                    setVisible()
                    return false
                } else {
                    if (mobBlocking(-29)) {
                        let soundAttack = new Audio(soundsAttack[Math.floor(Math.random() * 3)])
                        soundAttack.play()
                        attackMob(-29)
                        renderMob(player.currentTile-29)
                        postAttack = true
                    } else {
                        mobsAttack()
                        current.id = ''
                        nw.id = 'active'
                        player.currentTile = player.currentTile-29
                    }
                }
            } else if (moveNE) {
                if (northWall.includes(player.currentTile-27) || eastWall.includes(player.currentTile-27)) {
                    alert.innerHTML = ' You can\'t go that way!'
                    setVisible()
                    return false
                } else {
                    if (mobBlocking(-27)) {
                        let soundAttack = new Audio(soundsAttack[Math.floor(Math.random() * 3)])
                        soundAttack.play()
                        attackMob(-27)
                        renderMob(player.currentTile-27)
                        postAttack = true
                    } else {
                        mobsAttack()
                        current.id = ''
                        ne.id = 'active'
                        player.currentTile = player.currentTile-27
                    }
                }
            } else if (moveSW) {
                if (southWall.includes(player.currentTile+27) || westWall.includes(player.currentTile+27)) {
                    alert.innerHTML = ' You can\'t go that way!'
                    setVisible()
                    return false
                } else {
                    if (mobBlocking(27)) {
                        let soundAttack = new Audio(soundsAttack[Math.floor(Math.random() * 3)])
                        soundAttack.play()
                        attackMob(27)
                        renderMob(player.currentTile+27)
                        postAttack = true
                    } else {
                        mobsAttack()
                        current.id = ''
                        sw.id = 'active'
                        player.currentTile = player.currentTile+27
                    }
                }
            } else if (moveSE) {
                if (southWall.includes(player.currentTile+29) || eastWall.includes(player.currentTile+29) ) {
                    alert.innerHTML = ' You can\'t go that way!'
                    setVisible()
                    return false
                } else {
                    if (mobBlocking(29)) {
                        let soundAttack = new Audio(soundsAttack[Math.floor(Math.random() * 3)])
                        soundAttack.play()
                        attackMob(29)
                        renderMob(player.currentTile+29)
                        postAttack = true
                    } else {
                        mobsAttack()
                        current.id = ''
                        se.id = 'active'
                        player.currentTile = player.currentTile+29
                    }
                }
            } else if (moveEast) {
                if (eastWall.includes(player.currentTile+1)) {
                    alert.innerHTML = ' You can\'t go that way!'
                    setVisible()
                    return false
                } else {
                    if (mobBlocking(1)) {
                        let soundAttack = new Audio(soundsAttack[Math.floor(Math.random() * 3)])
                        soundAttack.play()
                        attackMob(1)
                        renderMob(player.currentTile+1)
                        postAttack = true
                        setVisible()
                    } else {
                        mobsAttack()
                        current.id = ''
                        east.id = 'active'
                        player.currentTile = player.currentTile+1
                    }
                }
            } else if (moveNorth) {
                if (northWall.includes(player.currentTile-28)) {
                    alert.innerHTML = ' You can\'t go that way!'
                    setVisible()
                    return false
                } else {
                    if (mobBlocking(-28)) {
                        let soundAttack = new Audio(soundsAttack[Math.floor(Math.random() * 3)])
                        soundAttack.play()
                        attackMob(-28)
                        renderMob(player.currentTile-28)
                        postAttack = true
                    } else {
                        mobsAttack()
                        current.id = ''
                        north.id = 'active'
                        player.currentTile = player.currentTile-28
                    }
                }
            } else if (moveSouth) {
                if (southWall.includes(player.currentTile+28)) {
                    alert.innerHTML = ' You can\'t go that way!'
                    setVisible()
                    return false
                } else {
                    if (mobBlocking(28)) {
                        let soundAttack = new Audio(soundsAttack[Math.floor(Math.random() * 3)])
                        soundAttack.play()
                        attackMob(28)
                        renderMob(player.currentTile+28)
                        postAttack = true
                    } else {
                        mobsAttack()
                        current.id = ''
                        south.id = 'active'
                        player.currentTile = player.currentTile+28
                    }
                }
            }

            if (moveDown) {
                if (dungeon.floors[player.currentFloor].tiles[player.currentTile].stairDown) {
                    player.currentFloor += 1
                    removeMaps()
                    renderFloor()
                } else {
                    postAttack = true
                    alert.innerHTML = 'There\'s no staircase here'
                }
            }

            if (moveUp) {
                if (dungeon.floors[player.currentFloor === 0]) {
                    alert.innerHTML = 'You can\'t go up from here'
                } else if (dungeon.floors[player.currentFloor].tiles[player.currentTile].stairUp) {
                    player.currentFloor -= 1
                    renderFloor()
                } else {
                    postAttack = true
                    alert.innerHTML = 'There\'s no staircase here'
                }
            }

            const postMove =()=> {
                resetFloorEls() // Reset the floor on every key action to clear any visible tiles from last movement
                postAttack ? postAttack = false : clearAlerts() // Reset alerts area after action
                setActive()     // Set active tile to wherever player moved
                setVisible()    // Set new visible area based on active tile
                describeTile()  // Describe the new active tile
                moveMobs()      // Move all of the mobs in a random dir
            }

            postMove()

            // Define the player's current tile
            let tile = dungeon.floors[player.currentFloor].tiles[player.currentTile]

            // Let the user know if there is a staircase
            if (tile.stairDown) {
                tileInfoDesc.innerHTML += ' You see a staircase leading down.'
            }

            if (tile.stairUp) {
                tileInfoDesc.innerHTML += ' You see a staircase leading up.'
            }

            if (look) {
                if (tile.item !== null) {
                    alert.innerHTML = `You see a ${tile.item.name} here.`
                } else {
                    alert.innerHTML = 'You see nothing of particular interest'
                }
            }

            if (tile.item !== null) {
                tileInfoDesc.innerHTML += ` You found a ${tile.item.name}. ${tile.item.description}`
            }

            if (tile.mob !== null) {
                tileInfoDesc.innerHTML += ` There is a ${tile.mob.name} here.`
            }

            if (get) {
                getItem()
            }

            if (drop) {
                if (dungeon.floors[player.currentFloor].tiles[player.currentTile].item === null) {
                    dropItem()
                    tileInfoDesc.innerHTML = `"${tile.desc}".`
                } else {
                    alert.innerHTML = 'There is already an item here, cannot drop another.'
                }
            }

            if (use) {
            if (player.inventory.items.length === -1) {
                alert.innerHTML = 'You have no items to use! Pick one up with G'
            } else {
                useItem()
            }
            }
        }
    })
}

const getItem =()=> {
  let item = dungeon.floors[player.currentFloor].tiles[player.currentTile].item
  console.log(item)
  if (item !== null && player.inventory.items.length < player.inventory.capacity) {
      player.inventory.items.push(item)
      if (item.type === 'map') {
        alert.innerHTML = `Map of floor ${item.floor} added to inventory.`
      } else {
        alert.innerHTML = `${item.name} added to inventory.`
      }

      dungeon.floors[player.currentFloor].tiles[player.currentTile].item = null
      tileArray[dungeon.floors[player.currentFloor].tiles[player.currentTile].id].innerHTML = ''
      renderCurrentTile()
      buildInventory()
  } else if (item !== null && player.inventory.items.length === player.inventory.capacity) {
      alert.innerHTML = 'Your inventory is full!'
  } else {
      alert.innerHTML = 'There\'s nothing here to pick up.'
  }
}

const dropItem =()=> {
  alert.innerHTML = 'Drop which item?'
  document.addEventListener('keydown', dropListener)
}

const useItem =()=> {
  alert.innerHTML = 'Use which item?'
  document.addEventListener('keydown', useListener)
}

const dropListener = function(e) {
  let items = player.inventory.items
  let item1 = e.keyCode == '49'
  let item2 = e.keyCode == '50'
  let item3 = e.keyCode == '51'
  let item4 = e.keyCode == '52'
  let item5 = e.keyCode == '53'
  let item6 = e.keyCode == '54'
  let item7 = e.keyCode == '55'
  let item8 = e.keyCode == '56'
  let item9 = e.keyCode == '57'
  let item10 = e.keyCode == '81'
  let item11 = e.keyCode == '87'
  let item12 = e.keyCode == '69'
  let item13 = e.keyCode == '82'
  let item14 = e.keyCode == '84'

  // prevent default action of ctrl and shift keys to avoid error
  if (e.ctrlKey) return false
  if (e.shiftKey) return false

  if (item1 && items[0]) {
      moveItem(0)
      alert.innerHTML = 'Dropped item 1'
  } else if (item2 && items[1]) {
      moveItem(1)
      alert.innerHTML = 'Dropped item 2'
  } else if (item3 && items[2]) {
      moveItem(2)
      alert.innerHTML = 'Dropped item 3'
  } else if (item4 && items[3]) {
      moveItem(3)
      alert.innerHTML = 'Dropped item 4'
  } else if (item5 && items[4]) {
      moveItem(4)
      alert.innerHTML = 'Dropped item 5'
  } else if (item6 && items[5]) {
      moveItem(5)
      alert.innerHTML = 'Dropped item 6'
  } else if (item7 && items[6]) {
      moveItem(6)
      alert.innerHTML = 'Dropped item 7'
  } else if (item8 && items[7]) {
      moveItem(7)
      alert.innerHTML = 'Dropped item 8'
  } else if (item9 && items[8]) {
      moveItem(8)
      alert.innerHTML = 'Dropped item 9'
  } else if (item10 && items[9]) {
      moveItem(9)
      alert.innerHTML = 'Dropped item q'
  } else if (item11 && items[10]) {
      moveItem(10)
      alert.innerHTML = 'Dropped item w'
  } else if (item12 && items[11]) {
      moveItem(11)
      alert.innerHTML = 'Dropped item e'
  } else if (item13 && items[12]) {
      moveItem(12)
      alert.innerHTML = 'Dropped item r'
  } else if (item14 && items[13]) {
      moveItem(13)
      alert.innerHTML = 'Dropped item t'
  } else {
      alert.innerHTML = 'There is no item in that slot.'
  }

  renderCurrentTile()
  buildInventory()
  document.removeEventListener('keydown', dropListener)
}

const useListener = function(e) {
  let items = player.inventory.items
  let item1 = e.keyCode == '49'
  let item2 = e.keyCode == '50'
  let item3 = e.keyCode == '51'
  let item4 = e.keyCode == '52'
  let item5 = e.keyCode == '53'
  let item6 = e.keyCode == '54'
  let item7 = e.keyCode == '55'
  let item8 = e.keyCode == '56'
  let item9 = e.keyCode == '57'
  let item10 = e.keyCode == '81'
  let item11 = e.keyCode == '87'
  let item12 = e.keyCode == '69'
  let item13 = e.keyCode == '82'
  let item14 = e.keyCode == '84'

  // prevent default action of ctrl and shift keys to avoid error
  if (e.ctrlKey) return false
  if (e.shiftKey) return false

  if (item1 && items[0]) {
      addItemEffects(0)
      removeItem(0)
      alert.innerHTML = 'Used item 1'
  } else if (item2 && items[1]) {
      addItemEffects(1)
      removeItem(1)
      alert.innerHTML = 'Used item 2'
  } else if (item3 && items[2]) {
      addItemEffects(2)
      removeItem(2)
      alert.innerHTML = 'Used item 3'
  } else if (item4 && items[3]) {
      addItemEffects(3)
      removeItem(3)
      alert.innerHTML = 'Used item 4'
  } else if (item5 && items[4]) {
      addItemEffects(4)
      removeItem(4)
      alert.innerHTML = 'Used item 5'
  } else if (item6 && items[5]) {
      addItemEffects(5)
      removeItem(5)
      alert.innerHTML = 'Used item 6'
  } else if (item7 && items[6]) {
      addItemEffects(6)
      removeItem(6)
      alert.innerHTML = 'Used item 7'
  } else if (item8 && items[7]) {
      addItemEffects(7)
      removeItem(7)
      alert.innerHTML = 'Used item 8'
  } else if (item9 && items[8]) {
      addItemEffects(8)
      removeItem(8)
      alert.innerHTML = 'Used item 9'
  } else if (item10 && items[9]) {
      addItemEffects(9)
      removeItem(9)
      alert.innerHTML = 'Used item q'
  } else if (item11 && items[10]) {
      addItemEffects(10)
      removeItem(10)
      alert.innerHTML = 'Used item w'
  } else if (item12 && items[11]) {
      addItemEffects(11)
      removeItem(11)
      alert.innerHTML = 'Used item e'
  } else if (item13 && items[12]) {
      addItemEffects(12)
      removeItem(12)
      alert.innerHTML = 'Used item r'
  } else if (item14 && items[13]) {
      addItemEffects(13)
      removeItem(13)
      alert.innerHTML = 'Used item t'
  } else {
      alert.innerHTML = 'There is no item in that slot.'
  }

  buildInventory()
  document.removeEventListener('keydown', useListener)
}

const addItemEffects =(slot)=> {
  let item = player.inventory.items[slot]
  if (item.type === 'armor') {
      player.stats.def = item.affects.def
  } else if (item.type === 'potion') {
      player.stats.hp += item.affects.hp
  } else if (item.type === 'weapon') {
      player.stats.atk = item.affects.atk
  } else if (item.type === 'map') {
      let tileEls = room.querySelectorAll('.hidden')

      for (let tileEl of tileEls) {
          tileEl.classList.remove('hidden')
          tileEl.classList.add('mapped')
      }
  }
  renderStats()
}

const moveItem =(slot)=> {
  dungeon.floors[player.currentFloor].tiles[player.currentTile].item = JSON.parse(JSON.stringify(player.inventory.items[slot]))
  player.inventory.items.splice(slot, 1)
}

const removeItem =(slot)=> {
  player.inventory.items.splice(slot, 1)
}

const removeMaps = ()=> {
    if (player.inventory.items.some(i => i.type === 'map')) {
        let filtered = player.inventory.items.filter(function(obj) { 
            return obj.type !== 'map'
        })
        player.inventory.items = filtered
        buildInventory()
        alert.innerHTML = 'The old maps in your inventory vanish'
    }
}

const attackMob =(dir)=> {
  let mob = dungeon.floors[player.currentFloor].tiles[player.currentTile + dir].mob
  
  if (mob.hp-1 < player.stats.atk) {
    mob.hp -= (player.stats.atk - mob.def)
    alert.innerHTML = `You smite the ${mob.name} for ${player.stats.atk} points.<br /> You abolish the ${mob.name}!`
    player.stats.abolished++
    renderStats()
    dungeon.floors[player.currentFloor].tiles[player.currentTile + dir].mob = null
  } else {
    if (!mob.aggro) {
        mob.aggro = true
    }

    mob.hp -= (player.stats.atk - mob.def)
    alert.innerHTML = `You smite the ${mob.name} for ${player.stats.atk} points.<br />The ${mob.name} has ${mob.hp} HP remaining.`
  }
}

const killPlayer =()=> {
    player.stats.hp = 0
    player.stats.def = 0
    startGame() // TODO why this no work??
    window.alert('Game over!')
}

export { playerActionEvents, getItem, dropItem, useItem, attackMob, killPlayer }
