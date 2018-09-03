// Misc variables
let tileArray, activeTileId
const visibleArray = [13, 14, 15, 1, -1, -13, -14, -15]
const westWall = [-1, 13, 27, 41, 55, 69, 83, 97, 111, 125, 139, 153, 167, 181]
const eastCol = [13, 27, 41, 55, 69, 83, 97, 111, 125, 139, 153, 167, 181, 195]
const westCol = [0, 14, 28, 42, 56, 70, 84, 98, 112, 126, 140, 154, 168, 182]
const eastWall = [14, 28, 42, 56, 70, 84, 98, 112, 126, 140, 154, 168, 182, 196]
const northWall = [-15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1]
const southWall = [196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210]
const tileInfoName = document.querySelector('#room-name')
const tileInfoDesc = document.querySelector('#room-desc')
const alert = document.querySelector('#alert')
const room = document.querySelector('#room')
const inventoryEl = document.querySelector('#inventory')

// Item array variables
const items = []

// Room variables
let rooms = []

const describeRooms = () => {
    let tileCount = 196
    for (let i = 0; i < tileCount; i++) {
        rooms.push([ 'Title', `Description of room ${i}`, 'Earth'])
    }
}

describeRooms() // We need to describe the rooms right off the bat for other functions to work

// items[#] = [ 'name', 'description', 'type' rarity/100 ]
items[0] = [ 'Breath recycler', 'Provides breathable air for a human or any similar creature who wears the device.', 'armor', 25 ]
items[1] = [ 'Floor map', 'Reveals all tiles on the current floor', 'tool', 15 ]
items[2] = [ 'Healing potion', 'Heals user 5 HP', 'potion', 10 ]
items[3] = [ 'Wooden practice sword', 'Hits for 3 HP', 'weapon', 10 ]
items[4] = [ 'Spectral chalice', 'Heals user to full HP and removes all afflictions', 'potion', 75 ]

// Object variables
const dungeon = {
    depth: 49,
    floors: []
}

const inventory = {
    capacity: 14,
    items: []
}

const player = {
    name: '',
    currentFloor: 0
}

// Constructor functions
function Floor(number, tiles) {
    this.number = number;
    this.tiles = tiles
}

function Tile(id, name, desc, floor, item) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.floor = floor;
    this.item = item;
}

const buildFloors = () => {
    for (let i = 0; i < dungeon.depth; i++) {
        let floor = new Floor(i, buildTiles())
        dungeon.floors.push(floor)

        console.log('Creating new floor')
    }
}

const buildTiles = () => {
    let tileCount = 196
    let tiles = []
    for (i = 0; i < tileCount; i++) {
        // Create a random item for each tile
        let randItem = Math.floor(Math.random() * Math.floor(items.length))
        let currentItem = items[randItem]

        let item = {
            name: currentItem[0],
            description: currentItem[1],
            type: currentItem[2],
            rarity: currentItem[3],
            chance: Math.floor(Math.random() * Math.floor(currentItem[3]))
        }

        if (item.chance !== 1) {
            item = null
        }

        // Construct the tile and push it to the temporary tiles array
        let tile = new Tile(i, rooms[i][0], rooms[i][1], rooms[i][2], item)
        tiles.push(tile)
    }
    return tiles
}

const renderFloor = () => {
    dungeon.floors[player.currentFloor].tiles.forEach(() => {
        const tileEl = document.createElement('div')
        room.appendChild(tileEl)
    })

    let randTileEl = room.childNodes[Math.floor(Math.random() * dungeon.floors[player.currentFloor].tiles.length)]
    let randTile = dungeon.floors[player.currentFloor].tiles[Math.floor(Math.random() * 196)]

    randTileEl.id = 'active'
    
    Object.defineProperty(randTile, 'stairDown', {
        value: true
    })

    let tiles = room.getElementsByTagName('div')
    tileArray = Array.from(tiles)
    activeTileId = tileArray.findIndex(x => x.id == 'active')
}

const buildInventory = () => {
    inventoryEl.innerHTML = ''
    inventory.items.forEach((item) => {
        let itemEl = document.createElement('div')
        let itemTextEl = document.createElement('p')
        itemTextEl.textContent = item.name
        itemEl.appendChild(itemTextEl)
        inventoryEl.appendChild(itemEl)
    })
}

// Clear the room of anything other than active, mapped and hidden tiles
const resetFloorEls = () => {
    tileArray.forEach((tile) => {
        if (tile.id != 'active' && !tile.classList.contains('staircase') && tile.className != 'mapped visible' && tile.className != 'mapped') {
            tile.className = 'hidden'
        } else if (tile.className == 'mapped visible') {
            tile.classList.remove('visible')
        }
    })
}

// Reset the value of the activeTileId variable
const setActive = () => {
    activeTileId = tileArray.findIndex(x => x.id == 'active')
}

// Set all tiles adjacent to activeTileId to be visible 
const setVisible = () => {
    let tileEls = room.getElementsByTagName('div')
    let tiles = dungeon.floors[player.currentFloor].tiles

    visibleArray.forEach((tile) => {
        if (eastCol.includes(activeTileId + tile) && westCol.includes(activeTileId) 
        || (westCol.includes(activeTileId + tile) && eastCol.includes(activeTileId))
        || northWall.includes(activeTileId + tile) 
        || southWall.includes(activeTileId + tile)) {
            return false
        } else if (tiles[activeTileId + tile].stairDown) {
            tileEls[activeTileId + tile].classList.remove('hidden')
            tileEls[activeTileId + tile].classList.add('mapped')
            tileEls[activeTileId + tile].classList.add('visible')
            tileEls[activeTileId + tile].classList.add('staircase')
        } else {
            tileEls[activeTileId + tile].classList.remove('hidden')
            tileEls[activeTileId + tile].classList.add('mapped')
            tileEls[activeTileId + tile].classList.add('visible')
        }
    })
}

// Clear the alerts
const clearAlerts = () => {
    alert.innerHTML = ''
}

// get an item
const getItem = () => {
    let item = dungeon.floors[player.currentFloor].tiles[activeTileId].item

    if (item !== null && inventory.items.length < inventory.capacity) {
        inventory.items.push(item)
        alert.innerHTML = `${item.name} added to inventory.`
        dungeon.floors[player.currentFloor].tiles[activeTileId].item = null
        buildInventory()
    } else if (item !== null && inventory.items.length === inventory.capacity) {
        alert.innerHTML = 'Your inventory is full!'
    } else {
        alert.innerHTML = 'There\'s nothing here to pick up.'
    }
}

const describeTile = () => {
    const room = dungeon.floors[player.currentFloor].tiles[activeTileId]

    tileInfoName.innerHTML = `${room.name} - Floor type: ${room.floor}`
    tileInfoDesc.innerHTML = `"${room.desc}".`
}