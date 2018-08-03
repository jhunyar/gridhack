// define variables we'll be using throughout the game
const grids = document.getElementById('map').getElementsByTagName('div')
const gridArray = Array.from(grids)
let activeGridId = gridArray.findIndex(x => x.id == 'active')
const visibleArray = [6, 7, 8, 1, -1, -6, -7, -8]
const leftwall = [-1, 6, 13, 20, 27, 34, 41]
const rightCol = [6,13,20,27,34,41,48]
const leftCol = [0,7,14,21,28,35,42]
const rightwall = [7, 14, 21, 28, 35, 42, 49]
const topwall = [-8, -7, -6, -5, -4, -3, -2, -1]
const bottomwall = [49, 50, 51, 52, 53, 54, 55, 56]
const roomInfoName = document.getElementById('room-name')
const roomInfoDesc = document.getElementById('room-desc')
const alert = document.getElementById('alert')

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
items[0] = [ 'Breath recycler', 'Provides breathable air for a human or any similar creature who wears the device.', 'armor', 25 ]
items[1] = [ 'Floor map', 'Reveals all tiles on the current floor', 'tool', 15 ]
items[2] = [ 'Healing potion', 'Heals user 5 HP', 'potion', 10 ]
items[3] = [ 'Wooden practice sword', 'Hits for 3 HP', 'weapon', 10 ]
items[4] = [ 'Spectral chalice', 'Heals user to full HP and removes all afflictions', 'potion', 75 ]

let randItem = Math.floor(Math.random() * Math.floor(items.length))

// Clear the map of aything other than active and inactive grids
const resetMap = () => {
    gridArray.forEach((grid) => {
        if ( grid.id != 'active' ) {
            grid.className = 'inactive'
        }
    })
}

// Reset the value of the activeGridId variable
const setActive = () => {
    activeGridId = gridArray.findIndex(x => x.id == 'active')
}

// Set all grids adjacent to activeGridId to be visible 
const setVisible = function (grid) {
    visibleArray.forEach((grid) => {
        if (rightCol.includes(activeGridId+grid) && leftCol.includes(activeGridId) 
        || (leftCol.includes(activeGridId+grid) && rightCol.includes(activeGridId))
        || topwall.includes(activeGridId + grid) 
        || bottomwall.includes(activeGridId + grid)) {
            return false
        } else {
            grids[activeGridId+grid].className = 'visible'
        }
    })
}

// Clear the alerts
const clearAlerts = () => {
    alert.innerHTML = ''
}