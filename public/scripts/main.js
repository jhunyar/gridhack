import { alert, northWall, eastWall, southWall, westWall, tileInfoDesc } from './constants.js'
import { dungeon, buildFloors, player } from './builder.js'
import { renderFloor, resetFloorEls, setActive, setVisible, describeTile, renderStats, tileArray, clearAlerts, renderMob } from './renderer.js'
import { moveMobs, mobBlocking } from './mobs.js'
import { getItem, useItem, dropItem, attackMob } from './actions.js'

const startGame =()=> {
    buildFloors()   // Build all dungeon floors
    renderFloor()   // Render the current floor
    resetFloorEls() // Reset the floor elements
    setActive()     // Set the active tile
    setVisible()    // Set visible tiles around active tile
    describeTile()  // Display information about the current tile
    renderStats()   // Display stat panel
}

startGame()

// main movement and action listener
document.addEventListener('keydown', function(e) {
    const current = tileArray[player.currentTile]
    const west = tileArray[player.currentTile-1]
    const east = tileArray[player.currentTile+1]
    const north = tileArray[player.currentTile-14]
    const south = tileArray[player.currentTile+14]

    let moveWest = e.keyCode == '37'
    let moveNorth = e.keyCode == '38'
    let moveEast = e.keyCode == '39'
    let moveSouth = e.keyCode == '40'
    let moveDown = e.keyCode == '34'
    let moveUp = e.keyCode == '33'
    let look = e.keyCode == '76'
    let get = e.keyCode == '71'
    let drop = e.keyCode == '68'
    let use = e.keyCode == '85'

    let postAttack = false

    if (moveWest || moveNorth || moveEast || moveSouth || moveDown || moveUp || look || get || drop || use) {

        // prevent default action of ctrl and shift keys to avoid error
        if (e.ctrlKey) return false
        if (e.shiftKey) return false

        // conditional movement rules to determine which tile we need to set as active and which we need to clear
        if (moveWest) {
            if (westWall.includes(player.currentTile-1)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                if (mobBlocking(-1)) {
                    attackMob(-1)
                    renderMob(player.currentTile-1)
                    postAttack = true
                } else {
                    current.id = ''
                    west.id = 'active'
                    player.currentTile = player.currentTile-1
                }
            }
        } else if (moveEast) {
            if (eastWall.includes(player.currentTile+1)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                if (mobBlocking(1)) {
                    attackMob(1)
                    renderMob(player.currentTile+1)
                    postAttack = true
                    setVisible()
                } else {
                    current.id = ''
                    east.id = 'active'
                    player.currentTile = player.currentTile+1
                }
            }
        } else if (moveNorth) {
            if (northWall.includes(player.currentTile-14)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                if (mobBlocking(-14)) {
                    attackMob(-14)
                    renderMob(player.currentTile-14)
                    postAttack = true
                } else {
                    current.id = ''
                    north.id = 'active'
                    player.currentTile = player.currentTile-14
                }
            }
        } else if (moveSouth) {
            if (southWall.includes(player.currentTile+14)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                if (mobBlocking(14)) {
                    attackMob(14)
                    renderMob(player.currentTile+14)
                    postAttack = true
                } else {
                    current.id = ''
                    south.id = 'active'
                    player.currentTile = player.currentTile+14
                }
            }
        }

        if (moveDown) {
            if (dungeon.floors[player.currentFloor].tiles[player.currentTile].stairDown) {
                player.currentFloor += 1
                renderFloor()
            } else {
                alert.innerHTML = 'There\'s no staircase here'
            }
        }

        if (moveUp) {
            if (dungeon.floors[player.currentFloor === 0]) {
                alert.innerHTML = 'You can\'t go up from here'
            } else if (dungeon.floors[player.currentFloor].tiles[player.currentTile].stairUp) {
                player.currentFloor -= 1
                renderFloor()
            } else {
                alert.innerHTML = 'There\'s no staircase here'
            }
        }

        const postMove =()=> {
            resetFloorEls() // Reset the floor on every key action to clear any visible tiles from last movement
            postAttack ? postAttack = false : clearAlerts() // Reset alerts area after action
            setActive()     // Set active tile to wherever player moved
            setVisible()    // Set new visible area based on active tile
            describeTile()  // Describe the new active tile
            moveMobs()      // Move all of the mobs in a random dir
        }

        postMove()

        // Define the player's current tile
        let tile = dungeon.floors[player.currentFloor].tiles[player.currentTile]

        // Let the user know if there is a staircase
        if (tile.stairDown) {
            tileInfoDesc.innerHTML += ' You see a staircase leading down.'
        }

        if (look) {
            if (tile.item !== null) {
                alert.innerHTML = `You see a ${tile.item.name} here.`
            } else {
                alert.innerHTML = 'You see nothing of particular interest'
            }
        }

        if (tile.item !== null) {
            tileInfoDesc.innerHTML += ` You found a ${tile.item.name}. ${tile.item.description}`
        }

        if (tile.mob !== null) {
            tileInfoDesc.innerHTML += ` There is a ${tile.mob.name} here.`
        }

        if (get) {
            getItem()
        }

        if (drop) {
            if (dungeon.floors[player.currentFloor].tiles[player.currentTile].item === null) {
                dropItem()
                tileInfoDesc.innerHTML = `"${tile.desc}".`
            } else {
                alert.innerHTML = 'There is already an item here, cannot drop another.'
            }
        }

        if (use) {
           if (player.inventory.items.length === -1) {
               alert.innerHTML = 'You have no items to use! Pick one up with G'
           } else {
               useItem()
           }
        }
    }
})