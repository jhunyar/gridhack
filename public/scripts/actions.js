import { alert } from './constants.js'
import { dungeon, player } from './builder.js'
import { renderCurrentTile, tileArray, buildInventory, renderStats } from './renderer.js'

// get an item
const getItem =()=> {
  let item = dungeon.floors[player.currentFloor].tiles[player.currentTile].item

  if (item !== null && player.inventory.items.length < player.inventory.capacity) {
      player.inventory.items.push(item)
      alert.innerHTML = `${item.name} added to inventory.`
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

const attackMob =(dir)=> {
  let mob = dungeon.floors[player.currentFloor].tiles[player.currentTile + dir].mob
  mob.hp -= (player.stats.atk - mob.def)
  alert.innerHTML = `You attack the ${mob.name} for ${player.stats.atk} points.`
  if (mob.hp < 1) {
      alert.innerHTML = `You kill the ${mob.name}`
      dungeon.floors[player.currentFloor].tiles[player.currentTile + dir].mob = null
  }
}

export { getItem, dropItem, useItem }