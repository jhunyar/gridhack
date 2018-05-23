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
            }
        } else if (moveRight) {
            if (rightwall.includes(activeGridId+1)) {
                output.innerHTML = ' You can\'t go that way!'
                return false
            } else {
                right.className = 'active'
            }
        } else if (moveUp) {
            if (topwall.includes(activeGridId-7)) {
                output.innerHTML = ' You can\'t go that way!'
                return false
            } else {
                up.className = 'active'
            }
        } else if (moveDown) {
            if (bottomwall.includes(activeGridId+7)) {
                output.innerHTML = ' You can\'t go that way!'
                return false
            } else {
                down.className = 'active'
            }
        }
        current.className = 'inactive'
        // we now need to redefine the activeGridId again to make sure it's correct after the move
        activeGridId = gridArray.findIndex(x => x.className == 'active')
        current = gridArray[activeGridId]
        output.innerHTML = 'You are in room #' + activeGridId
    })
}
