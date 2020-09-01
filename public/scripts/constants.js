// Tile arrays
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

export { visibleArray, eastWall, westWall, northWall, southWall, eastCol, westCol,
         tileInfoName, tileInfoDesc, alert, room, stats, inventoryEl, dungeonLevelEl }