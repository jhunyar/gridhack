// Tile variables
let tileArray
const visibleArray = [13, 14, 15, 1, -1, -13, -14, -15]
const eastWall = [14, 28, 42, 56, 70, 84, 98, 112, 126, 140, 154, 168, 182, 196]
const westWall = [-1, 13, 27, 41, 55, 69, 83, 97, 111, 125, 139, 153, 167, 181]
const northWall = [-15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1]
const southWall = [196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210]
const eastCol = eastWall.map(n => n - 1)
const westCol = westWall.map(n => n + 1)

// DOM element variables
const tileInfoName = document.querySelector('#room-name')
const tileInfoDesc = document.querySelector('#room-desc')
const alert = document.querySelector('#alert')
const room = document.querySelector('#room')
const inventoryEl = document.querySelector('#inventory')
const dungeonLevelEl = document.querySelector('#header--dungeon-counter')

// Item variables
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
items[1] = [ 'Floor map', 'Reveals all tiles on the current floor', 'map', 15 ]
items[2] = [ 'Healing potion', 'Heals user 5 HP', 'potion', 10 ]
items[3] = [ 'Wooden practice sword', 'Hits for 3 HP', 'weapon', 10 ]
items[4] = [ 'Spectral chalice', 'Heals user to full HP and removes all afflictions', 'potion', 75 ]

// Object variables
const dungeon = {
    depth: 49,
    floors: []
}

const player = {
    name: '',
    currentFloor: 0,
    currentTile: 0,
    inventory: {
        capacity: 14,
        items: []
    }
}

// Constructor functions
function Floor(number, tiles) {
    this.number = number;
    this.tiles = tiles
}

function Tile(id, name, desc, floor, item, mapped) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.floor = floor;
    this.item = item;
    this.mapped = mapped
}

const buildFloors = () => {
    for (let i = 0; i < dungeon.depth; i++) {
        let floor = new Floor(i, buildTiles())
    
        dungeon.floors.push(floor)

        // Create a down staircase on current floor in a random tile
        if (i !== dungeon.depth) {
            Object.defineProperty(dungeon.floors[i].tiles[Math.floor(Math.random() * 196)], 'stairDown', {
                value: true
            })
        }

        // Create an up staircase on each subsequent floor based on the prior floor's stairDown location
        if (i !== 0) {
            const staircase = dungeon.floors[i-1].tiles.filter((tile) => tile.stairDown)[0].id
            Object.defineProperty(dungeon.floors[i].tiles[staircase], 'stairUp', {
                value: true
            })
        }
    }
}

const buildTiles = () => {
    let tileCount = 196
    let tiles = []
    for (i = 0; i < tileCount; i++) {

        let item = placeItems()

        // Construct the tile and push it to the temporary tiles array
        let tile = new Tile(i, rooms[i][0], rooms[i][1], rooms[i][2], item, false)
        tiles.push(tile)
    }
    return tiles
}

const placeItems = () => {
    let currentItem = items[Math.floor(Math.random() * Math.floor(items.length))]

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

    return item
}

const renderFloor = () => {
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

    // Set the player.currentTile property to the element with the ID of active
    player.currentTile = tileArray.findIndex(x => x.id == 'active')
}

const renderItems = () => {
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

const buildInventory = () => {
    inventoryEl.innerHTML = ''
    player.inventory.items.forEach((item) => {
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
const setActive = () => {
    player.currentTile = tileArray.findIndex(x => x.id == 'active')
    dungeon.floors[player.currentFloor].tiles[player.currentTile].mapped = true
}

// Set all tiles adjacent to player.currentTile to be visible 
const setVisible = () => {
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
const clearAlerts = () => {
    alert.innerHTML = ''
}

// get an item
const getItem = () => {
    let item = dungeon.floors[player.currentFloor].tiles[player.currentTile].item

    if (item !== null && player.inventory.items.length < player.inventory.capacity) {
        player.inventory.items.push(item)
        alert.innerHTML = `${item.name} added to inventory.`
        dungeon.floors[player.currentFloor].tiles[player.currentTile].item = null
        tileArray[dungeon.floors[player.currentFloor].tiles[player.currentTile].id].innerHTML = ''
        renderItems()
        buildInventory()
    } else if (item !== null && player.inventory.items.length === player.inventory.capacity) {
        alert.innerHTML = 'Your inventory is full!'
    } else {
        alert.innerHTML = 'There\'s nothing here to pick up.'
    }
}

const describeTile = () => {
    const room = dungeon.floors[player.currentFloor].tiles[player.currentTile]

    tileInfoName.innerHTML = `${room.name} - Floor type: ${room.floor}`
    tileInfoDesc.innerHTML = `"${room.desc}".`
}