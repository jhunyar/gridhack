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

    // a reusable function to clear the map of anything other than active and inactive grids
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
        var current = gridArray[activeGridId]
        var left = gridArray[activeGridId-1]
        var right = gridArray[activeGridId+1]
        var up = gridArray[activeGridId-7]
        var down = gridArray[activeGridId+7]
        var moveLeft = e.keyCode == '37'
        var moveUp = e.keyCode == '38'
        var moveRight = e.keyCode == '39'
        var moveDown = e.keyCode == '40'
        var look = e.keyCode == '76'

        // prevent default action of ctrl and shift keys to avoid error
        if (e.ctrlKey) return false
        if (e.shiftKey) return false

        // we need to reset the map on every key action to clear any of the visible grids from the last movement
        resetMap()
        clearAlerts()

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

        let roomDescArray = [
            'Description of room 0',    // 0
            'Description of room 1',    // 1
            'Description of room 2',    // 2
            'Description of room 3',    // 3
            'Description of room 4',    // 4
            'Description of room 5',    // 5
            'Description of room 6',    // 6
            'Description of room 7',    // 7
            'Description of room 8',    // 8
            'Description of room 9',    // 9
            'Description of room 10',   // 10
            'Description of room 11',   // 11
            'Description of room 12',   // 12
            'Description of room 13',   // 13
            'Description of room 14',   // 14
            'Description of room 15',   // 15
            'Description of room 16',   // 16
            'Description of room 17',   // 17
            'Description of room 18',   // 18
            'Description of room 19',   // 19
            'Description of room 20',   // 20
            'Description of room 21',   // 21
            'Description of room 22',   // 22
            'Description of room 23',   // 23
            'Description of room 24',   // 24
            'Description of room 25',   // 25
            'Description of room 26',   // 26
            'Description of room 27',   // 27
            'Description of room 28',   // 28
            'Description of room 29',   // 29
            'Description of room 30',   // 30
            'Description of room 31',   // 31
            'Description of room 32',   // 32
            'Description of room 33',   // 33
            'Description of room 34',   // 34
            'Description of room 35',   // 35
            'Description of room 36',   // 36
            'Description of room 37',   // 37
            'Description of room 38',   // 38
            'Description of room 39',   // 39
            'Description of room 40',   // 40
            'Description of room 41',   // 41
            'Description of room 42',   // 42
            'Description of room 43',   // 43
            'Description of room 44',   // 44
            'Description of room 45',   // 45
            'Description of room 46',   // 46
            'Description of room 47',   // 47
            'Description of room 48'    // 48
        ]

        let roomNameArray = [
            'In the shadowed northwestern corner',      // 0
            'Along the northern boundary',              // 1
            'Along the northern boundary',              // 2
            'Along the northern boundary',              // 3
            'Along the northern boundary',              // 4
            'Along the northern boundary',              // 5
            'In the shadowed northeastern corner',      // 6
            'Along the western boundary',               // 7
            'Approaching the northwestern boundary',    // 8
            'Approaching the northern boundary',        // 9
            'Approaching the northern boundary',        // 10
            'Approaching the northern boundary',        // 11
            'Approaching the northeastern boundary',    // 12
            'Along the eastern boundary',               // 13
            'Along the western boundary',               // 14
            'Approaching the western boundary',         // 15
            'Venturing northwest from the center',      // 16
            'Venturing north from the center',          // 17
            'Venturing northeast from the center',      // 18
            'Approaching the eastern boundary',         // 19
            'Along the eastern boundary',               // 20
            'Along the western boundary',               // 21
            'Approaching the western boundary',         // 22
            'Venturing west from the center',           // 23
            'At the still center of the map',           // 24
            'Venturing east from the center',           // 25
            'Approaching the eastern boundary',         // 26
            'Along the eastern boundary',               // 27
            'Along the western boundary',               // 28
            'Approaching the western boundary',         // 29
            'Venturing southwest from the center',      // 30
            'Venturing south from the center',          // 31
            'Venturing southeast from the center',      // 32
            'Approaching the eastern boundary',         // 33
            'Along the eastern boundary',               // 34
            'Along the western boundary',               // 35
            'Approaching the southwestern boundary',    // 36
            'Approaching the southern boundary',        // 37
            'Approaching the southern boundary',        // 38
            'Approaching the southern boundary',        // 39
            'Approaching the southeastern boundary',    // 40
            'Along the eastern boundary',               // 41
            'In the shadowed southeastern corner',      // 42
            'Along the southern boundary',              // 43
            'Along the southern boundary',              // 44
            'Along the southern boundary',              // 45
            'Along the southern boundary',              // 46
            'Along the southern boundary',              // 47
            'In the shadowed southeastern corner'       // 48
        ]

        const room = {
            id: activeGridId,
            name: roomNameArray[activeGridId],
            description: roomDescArray[activeGridId],
            status: grids[activeGridId].id 
        }

        let roomDesc = roomDescArray[activeGridId]

        // output.innerHTML = 'You are in room # ' + activeGridId + '<p>' + roomDesc +'</p>'

        roomInfoName.innerHTML = `${room.id} - ${room.name}`
        roomInfoDesc.innerHTML = `"${room.description}".`

        if (look) {
            alert.innerHTML = 'You see nothing of particular interest'
        }
    })
}
