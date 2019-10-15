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
const stats = document.querySelector('#stats')
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

// items[#] = [ 'name', 'description', 'type' rarity/100, affect{} ]
items[0] = [ 'Breath recycler', 'Provides breathable air for a human or any similar creature who wears the device.', 'armor', 25, { poisonResist: true, swimming: true } ]
items[1] = [ 'Floor map', 'Reveals all tiles on the current floor', 'map', 15, { revealMap: true } ]
items[2] = [ 'Healing potion', 'Heals user 5 HP', 'potion', 20, { hp: 5 } ]
items[3] = [ 'Wooden practice sword', 'Hits for 3 HP', 'weapon', 20, { atk: 3 } ]
items[4] = [ 'Spectral chalice', 'Heals user to full HP and removes all afflictions', 'potion', 75, { hp: 100 } ]
items[5] = [ 'Leather armor', 'Provides 3 defense points', 'armor', 20, { def: 3 }]

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
    },
    stats: {
        level: 1,
        exp: 0,
        hp: 10,
        atk: 1,
        def: 1
    },
    status: {
        poisoned: false,
        poisonResist: false,
        swimming: false,
        revealMap: false
    },
    person: {
        armor: null,
        helmet: null,
        gloves: null,
        ringL: null,
        ringR: null,
        amulet: null,
        aura: null,
        curse: null
    }
}

let renderStats = () => {
    stats.innerHTML = ''
    for (let i = 0; i < Object.keys(player.stats).length; i++) {
        let p = document.createElement('p')
        p.classList.add('stat')
        p.textContent = `${(Object.keys(player.stats)[i]).toUpperCase()}: ${Object.values(player.stats)[i]}`
        stats.appendChild(p)
    }
}

// Constructor functions
function Floor(number, tiles) {
    this.number = number;
    this.tiles = tiles
}

function Tile(id, name, desc, floor, item, mob, mapped) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.floor = floor;
    this.item = item;
    this.mob = mob;
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
        let mob = placeMobs()
        if (mob !== null) {
            mob.currentTile = i
        }

        // Construct the tile and push it to the temporary tiles array
        let tile = new Tile(i, rooms[i][0], rooms[i][1], rooms[i][2], item, mob, false)
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
        affects: currentItem[4],
        chance: Math.floor(Math.random() * Math.floor(currentItem[3]))
    }

    if (item.chance !== 1) {
        item = null
    }

    return item
}

const placeMobs = () => {
    let currentMob = mobs[Math.floor(Math.random() * Math.floor(mobs.length))]

    let mob = {
        name: currentMob[1],
        description: currentMob[2],
        atk: currentMob[3],
        def: currentMob[4],
        rarity: currentMob[5],
        chance: Math.floor(Math.random() * Math.floor(currentMob[5]))
    }

    if (mob.chance !== 1) {
        mob = null
    }

    return mob
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
    renderMobs()

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

const renderMobs = () => {
    const currentFloor = dungeon.floors[player.currentFloor]
    currentFloor.tiles.forEach((tile) => {
        if (tile.mob) {
            tileArray[tile.id].innerHTML = '#' // '<img src="./assets/images/sword.png" width="70%">'
        } else {
            tileArray[tile.id].innerHTML = ''
            renderTile(tile.id)
        }
    })
}

const renderTile = (id) => {
    let tile = dungeon.floors[player.currentFloor].tiles[id]

    if (tile.item === null) {
        return
    }

    if (tile.item.type === 'weapon') {
        tileArray[tile.id].innerHTML = '<img src="./assets/images/sword.png" width="70%">'
    } else if (tile.item.type === 'armor') {
        tileArray[tile.id].innerHTML = '<img src="./assets/images/armor.png" width="70%">'
    } else if (tile.item.type === 'potion') {
        tileArray[tile.id].innerHTML = '<img src="./assets/images/potion.png" width="70%">'
    } else if (tile.item.type === 'map') {
        tileArray[tile.id].innerHTML = '<img src="./assets/images/map.png" width="70%">'
    }

    if (tile.stairDown) {
        tileArray[tile.id].innerHTML = '<i class="fas fa-arrow-down"></i>'
    }

    if (tile.stairUp) {
        tileArray[tile.id].innerHTML = '<i class="fas fa-arrow-up"></i>'
    }
}

const renderCurrentTile = () => {
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

const buildInventory = () => {
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
        renderCurrentTile()
        buildInventory()
    } else if (item !== null && player.inventory.items.length === player.inventory.capacity) {
        alert.innerHTML = 'Your inventory is full!'
    } else {
        alert.innerHTML = 'There\'s nothing here to pick up.'
    }
}

const dropItem = () => {
    alert.innerHTML = 'Drop which item?'
    document.addEventListener('keydown', dropListener)
}

const useItem = () => {
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

const describeTile = () => {
    const room = dungeon.floors[player.currentFloor].tiles[player.currentTile]

    tileInfoName.innerHTML = `${room.name} - Floor type: ${room.floor}`
    tileInfoDesc.innerHTML = `"${room.desc}".`
}

const addItemEffects = (slot) => {
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

const moveItem = (slot) => {
    dungeon.floors[player.currentFloor].tiles[player.currentTile].item = JSON.parse(JSON.stringify(player.inventory.items[slot]))
    player.inventory.items.splice(slot, 1)
}

const removeItem = (slot) => {
    player.inventory.items.splice(slot, 1)
}