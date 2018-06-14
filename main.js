function init() {
    // define variables we'll be using throughout the game
    const grids = document.getElementById('map').getElementsByTagName('div')
    const gridArray = Array.from(grids)
    let activeGrid = document.getElementById('active')
    let activeGridId = gridArray.findIndex(x => x.id == 'active')
    const visibleArray = [6, 7, 8, 1, -1, -6, -7, -8]
    const leftwall = [-1, 6, 13, 20, 27, 34, 41]
    const rightCol = [6,13,20,27,34,41,48]
    const leftCol = [0,7,14,21,28,35,42]
    const rightwall = [7, 14, 21, 28, 35, 42, 49]
    const topwall = [-8, -7, -6, -5, -4, -3, -2, -1]
    const bottomwall = [49, 50, 51, 52, 53, 54, 55, 56]
    const output = document.getElementById('output')
    const roomInfoName = document.getElementById('room-name')
    const roomInfoDesc = document.getElementById('room-desc')
    const alert = document.getElementById('alert')
    const floor = document.getElementById('floor-type')

    let rooms = []
    // rooms[x] = [ 'Room name', 'Room description', 'Floor type' ]
    rooms[0] = [ 'In the shadowed northwestern corner', 'Description of room 0', 'Earth' ]
    rooms[1] = [ 'Along the northern boundary', 'Description of room 1', 'Earth' ]
    rooms[2] = [ 'Along the northern boundary', 'Description of room 2', 'Earth' ]
    rooms[3] = [ 'Along the northern boundary', 'Description of room 3', 'Earth' ]
    rooms[4] = [ 'Along the northern boundary', 'Description of room 4', 'Earth' ]
    rooms[5] = [ 'Along the northern boundary', 'Description of room 5', 'Earth' ]
    rooms[6] = [ 'In the shadowed northeastern corner', 'Description of room 6', 'Earth' ]
    rooms[7] = [ 'Along the western boundary', 'Description of room 7', 'Earth' ]
    rooms[8] = [ 'Approaching the northwestern boundary', 'Description of room 8', 'Earth' ]
    rooms[9] = [ 'Approaching the northern boundary', 'Description of room 9', 'Earth' ]
    rooms[10] = [ 'Approaching the northern boundary', 'Description of room 10', 'Earth' ]
    rooms[11] = [ 'Approaching the northern boundary', 'Description of room 11', 'Earth' ]
    rooms[12] = [ 'Approaching the northeastern boundary', 'Description of room 12', 'Earth' ]
    rooms[13] = [ 'Along the eastern boundary', 'Description of room 13', 'Earth' ]
    rooms[14] = [ 'Along the western boundary', 'Description of room 14', 'Earth' ]
    rooms[15] = [ 'Approaching the western boundary', 'Description of room 15', 'Earth' ]
    rooms[16] = [ 'Venturing northwest from the center', 'Description of room 16', 'Earth' ]
    rooms[17] = [ 'Venturing north from the center', 'Description of room 17', 'Earth' ]
    rooms[18] = [ 'Venturing northeast from the center', 'Description of room 18', 'Earth' ]
    rooms[19] = [ 'Approaching the eastern boundary', 'Description of room 19', 'Earth' ]
    rooms[20] = [ 'Along the eastern boundary', 'Description of room 20', 'Earth' ]
    rooms[21] = [ 'Along the western boundary', 'Description of room 21', 'Earth' ]
    rooms[22] = [ 'Approaching the western boundary', 'Description of room 22', 'Earth' ]
    rooms[23] = [ 'Venturing west from the center', 'Description of room 23', 'Earth' ]
    rooms[24] = [ 'At the still center of the map', 'Description of room 24', 'Earth' ]
    rooms[25] = [ 'Venturing east from the center', 'Description of room 25', 'Earth' ]
    rooms[26] = [ 'Approaching the eastern boundary', 'Description of room 26', 'Earth' ]
    rooms[27] = [ 'Along the eastern boundary', 'Description of room 27', 'Earth' ]
    rooms[28] = [ 'Along the western boundary', 'Description of room 28', 'Earth' ]
    rooms[29] = [ 'Approaching the western boundary', 'Description of room 29', 'Earth' ]
    rooms[30] = [ 'Venturing southwest from the center', 'Description of room 30', 'Earth' ]
    rooms[31] = [ 'Venturing south from the center', 'Description of room 31', 'Earth' ]
    rooms[32] = [ 'Venturing southeast from the center', 'Description of room 32', 'Earth' ]
    rooms[33] = [ 'Approaching the eastern boundary', 'Description of room 33', 'Earth' ]
    rooms[34] = [ 'Along the eastern boundary', 'Description of room 34', 'Earth' ]
    rooms[35] = [ 'Along the western boundary', 'Description of room 35', 'Earth' ]
    rooms[36] = [ 'Approaching the southwestern boundary', 'Description of room 36', 'Earth' ]
    rooms[37] = [ 'Approaching the southern boundary', 'Description of room 37', 'Earth' ]
    rooms[38] = [ 'Approaching the southern boundary', 'Description of room 38', 'Earth' ]
    rooms[39] = [ 'Approaching the southern boundary', 'Description of room 39', 'Earth' ]
    rooms[40] = [ 'Approaching the southeastern boundary', 'Description of room 40', 'Earth' ]
    rooms[41] = [ 'Along the eastern boundary', 'Description of room 41', 'Earth' ]
    rooms[42] = [ 'In the shadowed southeastern corner', 'Description of room 42', 'Earth' ]
    rooms[43] = [ 'Along the southern boundary', 'Description of room 43', 'Earth' ]
    rooms[44] = [ 'Along the southern boundary', 'Description of room 44', 'Earth' ]
    rooms[45] = [ 'Along the southern boundary', 'Description of room 45', 'Earth' ]
    rooms[46] = [ 'Along the southern boundary', 'Description of room 46', 'Earth' ]
    rooms[47] = [ 'Along the southern boundary', 'Description of room 47', 'Earth' ]
    rooms[48] = [ 'In the shadowed southeastern corner', 'Description of room 48', 'Earth' ]

    let items = []
    // items[#] = [ 'name', 'description', 'type' rarity/100 ]
    items[0] = [ 'Breath recycler', 'Provides breathable air for a human or any similar creature who wears the device.', 'armor', 5 ]
    items[1] = [ 'Floor map', 'Reveals all tiles on the current floor', 'tool', 8 ]
    items[2] = [ 'Healing potion', 'Heals user 5 HP', 'potion', 4 ]
    items[3] = [ 'Wooden practice sword', 'Hits for 3 HP', 'weapon', 3 ]
    items[4] = [ 'Spectral chalice', 'Heals user to full HP and removes all afflictions', 'potion', 50 ]

    let randItem = Math.floor(Math.random() * Math.floor(items.length))

    let currentItem = items[randItem]
    console.log(currentItem)

    let item = {
        name: currentItem[0],
        description: currentItem[1],
        type: currentItem[2],
        rarity: currentItem[3],
        chance: Math.floor(Math.random() * Math.floor(currentItem[3]))
    }

    // a reusable function to clear the map of aything other than active and inactive grids
    function resetMap() {
        gridArray.forEach((grid, index, gridArray) => {
            if ( grid.id != 'active' ) {
                grid.className = 'inactive'
            }
        })
    }
 
    // a reusable function to reset the value of the activeGridId variable
    function setActive() {
        activeGridId = gridArray.findIndex(x => x.id == 'active')
    }

    // a reusable function to set all grids adjacent to activeGridId to be visible 
    function setVisible() {
        visibleArray.forEach(setVisible)
        function setVisible(grid) {            
            if (rightCol.includes(activeGridId+grid) && leftCol.includes(activeGridId))  {
                return false
            } else if (leftCol.includes(activeGridId+grid) && rightCol.includes(activeGridId)) {
                return false
            } else if (topwall.includes(activeGridId + grid)) {
                return false
            } else if (bottomwall.includes(activeGridId + grid)) {
                return false
            } else {
                grids[activeGridId+grid].className = 'visible'
            }
        }
    }

    function clearAlerts() {
        alert.innerHTML = ''
    }

    // lets go ahead and reset the map to start fresh
    resetMap()

    // lets also set up our visible grids since we already know our active grid (we start with one manually set as active)
    setVisible()

    // the movement handler itself
    document.addEventListener('keydown', function(e) {
        const current = gridArray[activeGridId]
        const left = gridArray[activeGridId-1]
        const right = gridArray[activeGridId+1]
        const up = gridArray[activeGridId-7]
        const down = gridArray[activeGridId+7]
        const moveLeft = e.keyCode == '37'
        const moveUp = e.keyCode == '38'
        const moveRight = e.keyCode == '39'
        const moveDown = e.keyCode == '40'
        const look = e.keyCode == '76'

        if (moveLeft || moveUp || moveRight || moveDown || look) {

            // prevent default action of ctrl and shift keys to avoid error
            if (e.ctrlKey) return false
            if (e.shiftKey) return false

            // we need to reset the map on every key action to clear any of the visible grids from the last movement
            resetMap()
            clearAlerts()
            randItem = Math.floor(Math.random() * Math.floor(items.length))
            currentItem = items[randItem]
            item.chance = Math.floor(Math.random() * Math.floor(currentItem[3]))


            // conditional movement rules to determine which grid we need to set as active and which we need to clear
            if (moveLeft) {
                if (leftwall.includes(activeGridId-1)) {
                    alert.innerHTML = ' You can\'t go that way!'
                    setVisible()
                    return false
                } else {
                    current.id = ''
                    left.id = 'active'
                }
            } else if (moveRight) {
                if (rightwall.includes(activeGridId+1)) {
                    alert.innerHTML = ' You can\'t go that way!'
                    setVisible()
                    return false
                } else {
                    current.id = ''
                    right.id = 'active'
                }
            } else if (moveUp) {
                if (topwall.includes(activeGridId-7)) {
                    alert.innerHTML = ' You can\'t go that way!'
                    setVisible()
                    return false
                } else {
                    current.id = ''
                    up.id = 'active'
                }
            } else if (moveDown) {
                if (bottomwall.includes(activeGridId+7)) {
                    alert.innerHTML = ' You can\'t go that way!'
                    setVisible()
                    return false
                } else {
                    current.id = ''
                    down.id = 'active'
                }
            }
            // everything after this point happens regardless of which direction the user enters
            
            // first of all, set our new active grid to wherever we moved
            setActive()

            // now set the visible grids based on that new active grid
            setVisible()

            // The cartographer's aide
            //  0  1  2  3  4  5  6
            //  7  8  9 10 11 12 13
            // 14 15 16 17 18 19 20
            // 21 22 23 24 25 26 27
            // 28 29 30 31 32 33 34
            // 35 36 37 38 39 40 41
            // 42 43 44 45 46 47 48

            const room = {
                id: activeGridId,
                name: rooms[activeGridId][0],
                description: rooms[activeGridId][1],
                floorType: rooms[activeGridId][2],
                status: grids[activeGridId].id 
            }

            roomInfoName.innerHTML = `${room.name} - Floor type: ${room.floorType} - Status: ${room.status}`
            roomInfoDesc.innerHTML = `"${room.description}".`

            if (look) {
                alert.innerHTML = 'You see nothing of particular interest'
            }

            console.log(currentItem)
            console.log(item.chance)
            
            if (item.chance == 1) {
                roomInfoDesc.innerHTML += ` You found a ${item.name}. ${item.description}`
            }
        }
    })
}
