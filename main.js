// Sets all divs as inactive except current active div
function setActive() {
    var grids = document.getElementById('map').getElementsByTagName('div')
    var gridArray = Array.from(grids)
    var activeGrid = document.getElementsByClassName('active')[0]
    var activeGridId = gridArray.findIndex(x => x.className == 'active')
    gridArray.forEach((grid, index, gridArray) => {
        if ( grid.className != 'active' ) {
            grid.className = 'inactive'
        }
    })

    document.addEventListener('keydown', function(e) {
        // we need to redefine activeGridId every time the key is pressed
        let activeGridId = gridArray.findIndex(x => x.className == 'active')
        var current = gridArray[activeGridId]
        var left = gridArray[activeGridId-1]
        var right = gridArray[activeGridId+1]
        var up = gridArray[activeGridId-7]
        var down = gridArray[activeGridId+7]
        var visibleRight = gridArray[activeGridId+1]
        var visibleTopLeft = gridArray[activeGridId-8]
        var visibleTopRight = gridArray[activeGridId-6]
        var visibleBotRight = gridArray[activeGridId+6]
        var visitbleBotLeft = gridArray[activeGridId+8]
        var moveLeft = e.keyCode == '37'
        var moveUp = e.keyCode == '38'
        var moveRight = e.keyCode == '39'
        var moveDown = e.keyCode == '40'
        var leftwall = [-1, 6, 13, 20, 27, 34, 41]
        var rightwall = [7, 14, 21, 28, 35, 42, 49]
        var topwall = [-7, -6, -5, -4, -3, -2, -1, 0]
        var bottomwall = [49, 50, 51, 52, 53, 54, 55]
        var output = document.getElementById('output')
        // prevent default action of ctrl and shift keys to avoid error
        if (e.ctrlKey) return false
        if (e.shiftKey) return false

        if (moveLeft) {
            if (leftwall.includes(activeGridId-1)) {
                output.innerHTML = ' You can\'t go that way!'
                return false
            } else {
                left.className = 'active'
                current.className = 'inactive'
                activeGridId = gridArray.findIndex(x => x.className == 'active')
                var visibleArray = [[activeGridId+1],[activeGridId+6],[activeGridId+7],[activeGridId+8],[activeGridId-1],[activeGridId-6],[activeGridId-7],[activeGridId-8]]
                visibleArray.forEach((grid,index,gridArray) => {
                    grid.className = 'visible'
                })
                console.log(visibleArray)
                
                
            }
        } else if (moveRight) {
            if (rightwall.includes(activeGridId+1)) {
                output.innerHTML = ' You can\'t go that way!'
                return false
            } else {
                right.className = 'active'
                current.className = 'inactive'
                activeGridId = gridArray.findIndex(x => x.className == 'active')
                var visibleArray = [[activeGridId+1],[activeGridId+6],[activeGridId+7],[activeGridId+8],[activeGridId-1],[activeGridId-6],[activeGridId-7],[activeGridId-8]]
                visibleArray.forEach((grid,index,gridArray) => {
                    grid.className = 'visible'
                })
                console.log(visibleArray)
            }
        } else if (moveUp) {
            if (topwall.includes(activeGridId-7)) {
                output.innerHTML = ' You can\'t go that way!'
                return false
            } else {
                up.className = 'active'
                current.className = 'inactive'
                activeGridId = gridArray.findIndex(x => x.className == 'active')
                var visibleArray = [[activeGridId+1],[activeGridId+6],[activeGridId+7],[activeGridId+8],[activeGridId-1],[activeGridId-6],[activeGridId-7],[activeGridId-8]]
                visibleArray.forEach((grid,index,gridArray) => {
                    grid.className = 'visible'
                })
                console.log(visibleArray)
            }
        } else if (moveDown) {
            if (bottomwall.includes(activeGridId+7)) {
                output.innerHTML = ' You can\'t go that way!'
                return false
            } else {
                down.className = 'active'
                current.className = 'inactive'
                activeGridId = gridArray.findIndex(x => x.className == 'active')
                var visibleArray = [[activeGridId+1],[activeGridId+6],[activeGridId+7],[activeGridId+8],[activeGridId-1],[activeGridId-6],[activeGridId-7],[activeGridId-8]]
                visibleArray.forEach((grid,index,gridArray) => {
                    grid.className = 'visible'
                })
                console.log(visibleArray)
            }
        }
        
        current = gridArray[activeGridId]
        output.innerHTML = 'You are in room #' + activeGridId

        let roomDescArray = [
            ['Description of room 0'],
            ['Description of room 1'],
            ['Description of room 2'],
            ['Description of room 3'],
            ['Description of room 4'],
            ['Description of room 5'],
            ['Description of room 6'],
            ['Description of room 7'],
            ['Description of room 8'],
            ['Description of room 9'],
            ['Description of room 10'],
            ['Description of room 11'],
            ['Description of room 12'],
            ['Description of room 13'],
            ['Description of room 14'],
            ['Description of room 15'],
            ['Description of room 16'],
            ['Description of room 17'],
            ['Description of room 18'],
            ['Description of room 19'],
            ['Description of room 20'],
            ['Description of room 21'],
            ['Description of room 22'],
            ['Description of room 23'],
            ['Description of room 24'],
            ['Description of room 25'],
            ['Description of room 26'],
            ['Description of room 27'],
            ['Description of room 28'],
            ['Description of room 29'],
            ['Description of room 30'],
            ['Description of room 31'],
            ['Description of room 32'],
            ['Description of room 33'],
            ['Description of room 34'],
            ['Description of room 35'],
            ['Description of room 36'],
            ['Description of room 37'],
            ['Description of room 38'],
            ['Description of room 39'],
            ['Description of room 40'],
            ['Description of room 41'],
            ['Description of room 42'],
            ['Description of room 43'],
            ['Description of room 44'],
            ['Description of room 45'],
            ['Description of room 46'],
            ['Description of room 47'],
            ['Description of room 48']
        ]

        let roomDesc = roomDescArray[activeGridId]
        output.innerHTML = 'You are in room # ' + activeGridId + '<p>' + roomDesc +'</p>'
        //console.log(roomDesc)
    })
}
