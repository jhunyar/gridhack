// Tile arrays
const visibleArray = [27, 28, 29, 1, -1, -27, -28, -29]
const eastWall = [
  0, 28,  56,  84, 112, 140, 168,
  196, 224, 252, 280, 308, 336,
  364, 392, 420, 448, 476, 504,
  532, 560, 588, 616, 644, 672,
  700, 728, 756, 784
]

const westWall = [
  -29, -1,  27,  55,  83, 111, 139, 167,
  195, 223, 251, 279, 307, 335, 363,
  391, 419, 447, 475, 503, 531, 559,
  587, 615, 643, 671, 699, 727, 755
]
const northWall = [-29, -28, -27, -26, -25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1]
const southWall = [784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812]
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