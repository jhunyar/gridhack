import { playerActionEvents } from './actions.js'
import { buildFloors } from './builder.js'
import { renderFloor, resetFloorEls, setActive, setVisible, describeTile, renderStats } from './renderer.js'

playerActionEvents()

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