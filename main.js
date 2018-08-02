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
    
    let moveLeft = e.keyCode == '37'
    let moveUp = e.keyCode == '38'
    let moveRight = e.keyCode == '39'
    let moveDown = e.keyCode == '40'
    let look = e.keyCode == '76'

    if (moveLeft || moveUp || moveRight || moveDown || look) {

        // prevent default action of ctrl and shift keys to avoid error
        if (e.ctrlKey) return false
        if (e.shiftKey) return false

        // we need to reset the map on every key action to clear any of the visible grids from the last movement
        resetMap()
        clearAlerts()

        let currentItem = items[randItem]

        let item = {
            name: currentItem[0],
            description: currentItem[1],
            type: currentItem[2],
            rarity: currentItem[3],
            chance: Math.floor(Math.random() * Math.floor(currentItem[3]))
        }

        randItem = Math.floor(Math.random() * Math.floor(items.length))
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
            status: grids[activeGridId].id,
            item: '' 
        }

        roomInfoName.innerHTML = `${room.name} - Floor type: ${room.floorType}`
        roomInfoDesc.innerHTML = `"${room.description}".`

        if (look) {
            alert.innerHTML = 'You see nothing of particular interest'
        }
        if (item.chance == 1) {
            roomInfoDesc.innerHTML += ` You found a ${item.name}. ${item.description}`
            console.log(currentItem)
        }
    }
})