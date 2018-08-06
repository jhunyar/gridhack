// TODO:
    // Build tiles as objects that have all of the properties from the array 
    // Create a findItem function that, upon RNG item drop, adds it to the current tile's array/object
    // Create an inventory UI
    // Create inventory object/array
    // Create a listener for 'g' that removes item from tile if present, and adds to inventory array
        // Create a refreshInventory function that redraws the inventory(?)
// 

buildRoom()

// lets go ahead and reset the room to start fresh
resetRoom()

// lets also set up our visible tiles since we already know our active tile (we start with one manually set as active)
setVisible()

// the movement handler itself
document.addEventListener('keydown', function(e) {
    const current = tileArray[activeTileId]
    const left = tileArray[activeTileId-1]
    const right = tileArray[activeTileId+1]
    const up = tileArray[activeTileId-7]
    const down = tileArray[activeTileId+7]
    
    let moveLeft = e.keyCode == '37'
    let moveUp = e.keyCode == '38'
    let moveRight = e.keyCode == '39'
    let moveDown = e.keyCode == '40'
    let look = e.keyCode == '76'

    if (moveLeft || moveUp || moveRight || moveDown || look) {

        // prevent default action of ctrl and shift keys to avoid error
        if (e.ctrlKey) return false
        if (e.shiftKey) return false

        // we need to reset the room on every key action to clear any of the visible tiles from the last movement
        resetRoom()
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

        // conditional movement rules to determine which tile we need to set as active and which we need to clear
        if (moveLeft) {
            if (leftwall.includes(activeTileId-1)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                current.id = ''
                left.id = 'active'
            }
        } else if (moveRight) {
            if (rightwall.includes(activeTileId+1)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                current.id = ''
                right.id = 'active'
            }
        } else if (moveUp) {
            if (topwall.includes(activeTileId-7)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                current.id = ''
                up.id = 'active'
            }
        } else if (moveDown) {
            if (bottomwall.includes(activeTileId+7)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                current.id = ''
                down.id = 'active'
            }
        }
        // everything after this point happens regardless of which direction the user enters
        
        // first of all, set our new active tile to wherever we moved
        setActive()

        // now set the visible tiles based on that new active tile
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
            id: activeTileId,
            name: rooms[activeTileId][0],
            description: rooms[activeTileId][1],
            floorType: rooms[activeTileId][2],
            status: tiles[activeTileId].id,
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