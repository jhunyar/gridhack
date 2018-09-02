// Misc variables
let tileArray, activeTileId
const visibleArray = [13, 14, 15, 1, -1, -13, -14, -15]
const leftWall = [-1, 13, 27, 41, 53, 69, 83, 97, 111, 125, 139, 153, 167, 181]
const rightCol = [13, 27, 41, 55, 69, 83, 97, 111, 125, 139, 153, 167, 181, 195]
const leftCol = [0, 14, 28, 42, 56, 70, 84, 98, 112, 126, 140, 154, 168, 182]
const rightWall = [14, 28, 42, 56, 70, 84, 98, 112, 126, 140, 154, 168, 182, 196]
const topWall = [-14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1]
const bottomWall = [196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209]
const roomInfoName = document.querySelector('#room-name')
const roomInfoDesc = document.querySelector('#room-desc')
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

// We need to describe the rooms right off the bat for other functions to work
describeRooms()

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

// Constructor functions
function Floor(number, tiles) {
    this.number = number;
    this.tiles = tiles
}

let currentFloor = 0

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
    dungeon.floors[currentFloor].tiles.forEach(() => {
        const tileEl = document.createElement('div')
        room.appendChild(tileEl)
    })

    room.childNodes[24].id = 'active'

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

// Clear the room of aything other than active and inactive tiles
const resetFloor = () => {
    tileArray.forEach((tile) => {
        if ( tile.id != 'active' ) {
            tile.className = 'inactive'
        }
    })
}

// Reset the value of the activeTileId variable
const setActive = () => {
    activeTileId = tileArray.findIndex(x => x.id == 'active')
}

// Set all tiles adjacent to activeTileId to be visible 
const setVisible = () => {
    let tiles = room.getElementsByTagName('div')
    visibleArray.forEach((tile) => {
        if (rightCol.includes(activeTileId+tile) && leftCol.includes(activeTileId) 
        || (leftCol.includes(activeTileId+tile) && rightCol.includes(activeTileId))
        || topWall.includes(activeTileId + tile) 
        || bottomWall.includes(activeTileId + tile)) {
            return false
        } else {
            tiles[activeTileId+tile].className = 'visible'
        }
    })
}

// Clear the alerts
const clearAlerts = () => {
    alert.innerHTML = ''
}

// get an item
const getItem = () => {
    let item = dungeon.floors[currentFloor].tiles[activeTileId].item

    if (item !== null && inventory.items.length < inventory.capacity) {
        inventory.items.push(item)
        alert.innerHTML = `${item.name} added to inventory.`
        dungeon.floors[currentFloor].tiles[activeTileId].item = null
        buildInventory()
    } else if (item !== null && inventory.items.length === inventory.capacity) {
        alert.innerHTML = 'Your inventory is full!'
    } else {
        alert.innerHTML = 'There\'s nothing here to pick up.'
    }
}

const describeTile = () => {
    const room = dungeon.floors[currentFloor].tiles[activeTileId]

    roomInfoName.innerHTML = `${room.name} - Floor type: ${room.floor}`
    roomInfoDesc.innerHTML = `"${room.desc}".`
}